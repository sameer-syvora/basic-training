// Deep clone Javascript Object (without using any internal methods of cloning). All properties along with functions, prototypes should get cloned to target objects.

const user = {
    name: 'Sameer',
    age: 23,
    id: 1234,
    contact: {
        email: "sam@gmail.com",
        number: 98745
    }
}

//Without using any inbuilt function 
function deepClone(value) {
    // If value is not an object, return it as is
    if (!value || typeof value !== "object") {
        return value;
    }

    // If it is an array, map over it and deep clone each item
    if (Array.isArray(value)) {
        return value.map(item => deepClone(item));
    }

    // If it is an object, iterate over its keys and deep clone each value
    return Object.keys(value).reduce((acc, key) => {
        acc[key] = deepClone(value[key]);
        return acc;
    }, {});
}

const clone = deepClone(user);

// Using spread operator (Shallow copy of sub objects and deep copy of primitive)
const cloneUser1 = { ...user };

// Using JSON.parse() method  (Deep Copy of all objects except functions)
const cloneUser2 = JSON.parse(JSON.stringify(user));

// Using Object.assign() method  (Shallow copy of sub objects and deep copy of primitive values)
const cloneUser3 = Object.assign({}, user);
