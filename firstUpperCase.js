// Write a JavaScript program to test if the first character of a string is uppercase or not, if not then set the first character to uppercase

function changeFirst(obj) {
    if (obj.a[0] !== obj.a[0].toUpperCase()) {
        obj.a = obj.a[0].toUpperCase() + obj.a.slice(1);
    }
}

const obj = {
    a: "hello",
}

changeFirst(obj);
console.log(obj.a);