let a = 0, b = 0; // a is the accumulator when doing more than 1 operation
let lastOperation = "";
let lastClickIsOp = false;

// x means it should be filled with a number
let calculatorShape = [
  ["AC", "+/-", "%", "/"],
  ["x", "x", "x", "*"],
  ["x", "x", "x", "-"],
  ["x", "x", "x", "+"],
  ["x", ".", "="],
];


let operators = {
    "/": (a,b) => a/b,
    "+": (a,b) => a+b,
    "-": (a,b) => a-b,
    "*": (a,b) => a*b,
}

function enumerateCalculator(calculatorArray) {
  let currentNumber = 0;
  for (let i = calculatorArray.length - 1; i >= 0; i--) {
    for (let j = 0; j < calculatorArray[i].length; j++) {
      if (calculatorArray[i][j] === "x") {
        calculatorArray[i][j] = currentNumber.toString();
        currentNumber++;
      }
    }
  }
}

function setScreenText(x) {
  let screenObj = document.getElementById("user-input-area");
  screenObj.value = x;
}

function getScreenText() {
    let screenObj = document.getElementById("user-input-area");
    return screenObj.value;
}

function getScreenValue() {
    console.log(parseInt(getScreenText()))
    return parseInt(getScreenText());
}

function setBtnEvent(btn) {
    btnType = btn.id;
    if (btnType == "num-btn") {
        btn.addEventListener("click", (event) => {
            if(lastClickIsOp) {
                setScreenText("");
            }
            setScreenText(getScreenText() + event.target.textContent);
            lastClickIsOp = false;
        });
        return;
    }

    btn.addEventListener("click", (event) => {
        if(lastOperation.length > 0) // not the first operation
        {
            b = getScreenValue();
            opFunc = operators[event.target.textContent]; // apply the last operation
            // apply the operation on a, b and store the result in a
            a = opFunc(a, b);
            // print the result
            setScreenText(a.toString());
        }
        else 
        {
            a = getScreenValue();
        }
        lastClickIsOp = true;
        lastOperation = event.target.textContent;
    })
}


function createCalculatorView(calculatorArray) {
  let calculatorContainer = document.getElementById("calculator-container");
  for (let i = 0; i < calculatorArray.length; i++) {
    // create a div for the row
    let div = document.createElement("div");
    div.id = "calc-row";

    for (let j = 0; j < calculatorArray[i].length; j++) {
      let btn = document.createElement("button");
      let val = calculatorArray[i][j];
      btn.innerText = val;
      btn.id = isNaN(val) ? "op-btn" : "num-btn";
      setBtnEvent(btn)

      if (val === "0") {
        btn.classList.add("zero-btn");
      }

      div.appendChild(btn);
    }

    calculatorContainer.appendChild(div);
  }
}

enumerateCalculator(calculatorShape);
createCalculatorView(calculatorShape);
