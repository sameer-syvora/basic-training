// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
    // Write your code here
    let max = 0;
    let second_max = 0;
    for (const i of array) {
        if (i >= max) {
            second_max = max;
            max = i;
        } else if (i > second_max) {
            second_max = i;
        }
    }
    return second_max;
}

// Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
function calculateFrequency(string) {
    // Write your code here
    let obj = {};
    for (const i in string) {
        let char_code = string.charCodeAt(i);
        let newstr = "" + string[i];
        if (char_code >= 97 && char_code < 123) {
            if (obj[newstr] == undefined) {
                obj[newstr] = 1;
            } else {
                obj[newstr]++;
            }
        }
    }
    return obj;
}

// Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
function flatten(obj) {
    // Write your code here
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            const sub_obj = flatten(obj[key]);
            for (const subkey in sub_obj) {
                result[key + "." + subkey] = sub_obj[subkey];
            }
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

// Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
function unflatten(obj) {
    // Write your code here
    const result = {};
    for (const key in obj) {
        let current = result;
        const parts = key.split(".");
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part];
        }
        current[parts[parts.length - 1]] = obj[key];
    }
    return result;
}
