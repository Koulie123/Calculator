
//setting up the buttons
const allButtons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".num");
const runningTotal = document.querySelector(".running-total");
const currentlyTyped = document.querySelector(".currently-typed");
const operandButtons = document.querySelectorAll(".operand");
let currentlyTypedArray = [];

let numberStack = [];
let numbersToOperate = [];
let result = 0;
let typeOfOperation = "";
allButtons.forEach((button) => {
    button.textContent = button.value;
});



//DISPLAY
const updateDisplay = function() {
    // let arrayToDisplay = currentlyTypedArray.filter((element) => {
    //     return (element.isNumber|| (element.isOperand && !element.isEquals));
    // })
    // currentlyTyped.textContent = arrayToDisplay.map(element => element.value).join("");
    let arrayToDisplay = currentlyTypedArray.map(element => element.value).join("");
    currentlyTyped.textContent = arrayToDisplay;
}




const handleButtonClick = function(button) {
    let buttonObject = createButtonObject(button);
    console.log(buttonObject);
    if (buttonObject.isNumber) {
        currentlyTypedArray.push(buttonObject);
        numberStack.push(buttonObject.value);
        console.log("number pushed to number stack" + buttonObject.value);
        console.log(currentlyTypedArray);
        console.log(buttonObject);
        updateDisplay();
    }
    if (buttonObject.isOperand && buttonObject.isEquals) handleEquals(buttonObject);
    if (buttonObject.isClear) clear();
    if (buttonObject.isOperand && buttonObject.operandType == "+") handlePlus(buttonObject);
    if (buttonObject.isOperand && buttonObject.operandType == "-") handleMinus(buttonObject);
    if (buttonObject.isOperand && buttonObject.operandType == "*") handleMultiply(buttonObject);
    if (buttonObject.isOperand && buttonObject.operandType == "/") handleDivide(buttonObject);
    
};
//Defining the button object online
function createButtonObject(event) {
    let buttonObject = {
        value: event.value,
        isNumber: false,
        isOperand: false,
        isEquals: false,
        isClear: false,
        operandType: "",
    }
    if (event.classList.contains("num")) buttonObject.isNumber = true;
    if (event.classList.contains("operand")) buttonObject.isOperand = true;
    if (event.id == "equals") buttonObject.isEquals = true;
    if (event.id == "clear") buttonObject.isClear = true;
    if (event.id == "add") buttonObject.operandType = "+";
    if (event.id == "subtract") buttonObject.operandType = "-";
    if (event.id == "multiply") buttonObject.operandType = "*";
    if (event.id == "divide") buttonObject.operandType = "/";
    return buttonObject;
}

allButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        handleButtonClick(event.target);
    });
});

function clear() {
    while (currentlyTypedArray.length > 0) {
        currentlyTypedArray.pop();
    }
    numberStack = [];
    currentlyTyped.textContent = "0";
    result = 0;
    numbersToOperate = [];
    runningTotal.textContent = "0";
    typeOfOperation = "";
}
//Matmatical Operation Execution
function add() {
    result = numbersToOperate[0] + numbersToOperate[1];
    console.log("result" + result);
    runningTotal.textContent = result;
    while (numbersToOperate.length > 1) {
        numbersToOperate.pop();
    }
    numbersToOperate[0] = result;
}
function subtract() {
    result = numbersToOperate[0] - numbersToOperate[1];

}
function handlePlus(buttonObject) {
    console.log("handlePlusFunction");
    console.log("type of operation" + typeOfOperation);
    if (!(typeOfOperation == "+")){
        console.log("number pushed to numbers to operate" + Number(numberStack.join("")));
        if (numberStack.length > 0) numbersToOperate.push(Number(numberStack.join("")));
        typeOfOperation = "+";
        currentlyTypedArray.push(buttonObject);
        numberStack = [];
        updateDisplay();
    }
}
function handleMinus(buttonObject) {
    if (typeOfOperation == "-") {
        if (numberStack.length > 0) numbersToOperate.push(Number(numberStack.join("")));
        typeOfOperation = "-";
        currentlyTypedArray.push(buttonObject);
        numberStack = [];
        updateDisplay();
    }
}
function handleMultiply(buttonObject) {
    if (!(typeOfOperation == "*")){
        if (numberStack.length > 0) numbersToOperate.push(Number(numberStack.join("")));
        typeOfOperation = "*";
        currentlyTypedArray.push(buttonObject);
        numberStack = [];
        updateDisplay();
    }
}
function handleDivide(buttonObject) {
    if (!(typeOfOperation == "/")){
        numbersToOperate.push(Number(numberStack.join("")));
        typeOfOperation = "/";
        currentlyTypedArray.push(buttonObject);
        numberStack = [];
        updateDisplay();
    }
}

function handleEquals(buttonObject) {
    console.log("current number stack " + numberStack);
    numbersToOperate.push(Number(numberStack.join("")));
    console.log("numbers to operate" + numbersToOperate);
    switch(typeOfOperation){
        case "+":
            console.log("number to add" + numbersToOperate[0]);
            console.log("second number to add" + numbersToOperate[1]);
            add();
            break;
        case "-":
            subtract();
            break;
        case "*":
            multiply();
            break;
        case "/":
            divide();
            break;
    }
    currentlyTypedArray = result.map(element => {
        let buttonObject = {
            
                value: element,
                isNumber: false,
                isOperand: false,
                isEquals: false,
                isClear: false,
                operandType: "",
            }
            return buttonObject;
        });
    console.log("currently typed array" + currentlyTypedArray);
    typeOfOperation = "";
    numbersToOperate = [result];
    numberStack = [];
    updateDisplay();
}
