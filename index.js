// x means it should be filled with a number
let calculatorShape = [
    ["AC", "+/-", "%", "/"],
    ["x", "x", "x", "*"],
    ["x", "x", "x", "-"],
    ["x", "x", "x", "+"],
    ["x", ".", "="],
]

function makeCalculator(calculatorArray) {
    let currentNumber = 0;
    for(let i = calculatorArray.length - 1; i >= 0; i--) {
        for(let j = 0;j<calculatorArray.length;j++) {
            if (calculatorArray[i][j] === "x") {
                calculatorArray[i][j] = currentNumber.toString();
                currentNumber++;
            }
        }
    }
}


makeCalculator(calculatorShape)
console.log(calculatorShape)