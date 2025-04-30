// Create a function to calculate the factorial of a number using closure

function calculateFactorial() {

    const factorial_values = {
        0: 1,
        1: 1,
    }

    return function (n) {
        if (factorial_values[n] != undefined) return factorial_values[n];
        else factorial_values[n] = n * calculateFactorial()(n - 1);
        return factorial_values[n];
    }
}


const factorial = calculateFactorial();
console.log(factorial(6));