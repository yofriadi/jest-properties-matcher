"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject = (obj, ObjectId) => {
    if (typeof obj === 'object' && obj !== null &&
        ((ObjectId && !ObjectId.isValid(obj)) || true)) {
        const proto = Reflect.getPrototypeOf(obj);
        return proto === Object.prototype || proto === null;
    }
    return false;
};
const match = constructor => expect.any(constructor);
const propertiesMatcher = (obj, matchers, ObjectId) => {
    obj = Object.assign({}, obj);
    for (const prop in obj) {
        if (Array.isArray(obj[prop])) {
            if (matchers[prop]) {
                obj[prop] = match(matchers[prop]);
            }
            else {
                obj[prop] = obj[prop].map(elm => {
                    if (isPlainObject(elm, ObjectId)) {
                        return propertiesMatcher(elm, matchers, ObjectId);
                    }
                    else if (ObjectId && ObjectId.isValid(elm)) {
                        return match(String);
                    }
                    return elm;
                });
            }
        }
        else if (isPlainObject(obj[prop], ObjectId)) {
            obj[prop] = propertiesMatcher(obj[prop], matchers, ObjectId);
        }
        else {
            matchers[prop] && (obj[prop] = match(matchers[prop]));
        }
    }
    return obj;
};
exports.default = propertiesMatcher;
