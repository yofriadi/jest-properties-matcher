Recursively matching properties with their constructor for jest snapshot.

## Problem
When matching huge object you often encounter the same properties with same constructor or type, this package provide tool for doing less code duplication and deep object matching (the module will search any property name on all levels).

Example
```js
const object = {
  data: {
    myProp: { prop: 'a string' },  // prop will appear more than one
    anotherProp: {
      level2Prop: {
        level3Prop: {
          level4Prop: {
            level5Prop: { prop: 'another string' }  // deep prop level with same key
          }
        }
      }
    }
  }
}
`;

// without properties matcher
expect(object).toMatchSnapshot({
  data: {
    myProp: { prop: expect.any(String) },
    anotherProp: {
      level2Prop: {
        level3Prop: {
          level4Prop: {
            level5Prop: { prop: expect.any(String) }
          }
        }
      }
    }
  }
})

// with properties matcher
expect(object).toMatchSnapshot(
  propertiesMatcher(object, {
    prop: String
  })
)
```

## Installation
```sh
# npm
npm install jest-properties-matcher

# yarn
yarn add jest-properties-matcher
```

## API
### propertiesMatcher(object: object, matchers: object, ObjectId: object)
object: the object to match

matchers: list of properties to match their property with their constructor

ObjectId: there is a case when using mongodb, the `_id` is an object but not javascript object