const isPlainObject = (obj: object, ObjectId: object) => {
  if (
    typeof obj === 'object' && obj !== null &&
    ((ObjectId && !ObjectId.isValid(obj)) || true)
  ) {
    const proto = Reflect.getPrototypeOf(obj)
    return proto === Object.prototype || proto === null
  }

  return false
}

const match = (constructor: object): object  => expect.any(constructor)

const propertiesMatcher = (obj: object, matchers: object, ObjectId: object) => {
  obj = { ...obj }

  for (const prop in obj) {
    if (Array.isArray(obj[prop])) {
      obj[prop] = match(matchers[prop])
    } else {
      obj[prop] = obj[prop].map(elm => {
        if (ObjectId) {
          if (isPlainObject(elm, ObjectId)) {
            return propertiesMatcher(elm, matchers, ObjectId)
          } else if (ObjectId.isvalid(elm)) {
            return match(String)
          }
        }

        return elm
      })
    } else if (ObjectId && isPlainObject(obj[prop], ObjectId)) {
      obj[prop] = propertiesMatcher(obj[prop], matchers, ObjectId)
    } else {
      matchers[prop] && (obj[prop] = match(matchers[prop]))
    }
  }
}