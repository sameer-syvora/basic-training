// Create a constructor function Calculator that creates objects with 3 methods:
// read() asks for two values using prompt and remembers them in object properties.
// sum() returns the sum of these properties.
// mul() returns the multiplication product of these properties.

function Calculator() {
    let a, b;
    return {
        read: function (p, q) {
            a = p;
            b = q;
        },
        sum: function () {
            if (a != undefined && b != undefined) return a + b;
            else return "no value inserted";
        },
        mul: function () {
            if (a != undefined && b != undefined) return a * b;
            else return "no value inserted";
        }
    }
}

const calculate = Calculator();

calculate.read(3, 2);
console.log(calculate.mul());