function add(term1, term2) {
    return term1 + term2;
}

function subtract(term1, term2) {
    return term1 - term2;
}

function multiply(factor1, factor2) {
    return factor1 * factor2;
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return;
    }
}

const display = document.querySelector('#display-box');
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operations');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');

function main() {
    // global variables
    let dataObj = {};

    displayNumbers(dataObj);
    setClear(dataObj);
    setOperators(dataObj);
    setEquals(dataObj);
}

function setClear(obj) {
    clear.addEventListener('click', () => {
    obj.displayVar = null;
    obj.firstVar = null;
    obj.secondVar = null;
    obj.operator = null;
    obj.result = null;
    display.textContent = null;
    console.log(obj);
    });
}


function displayNumbers(obj) {
    console.log(obj);
    numberButtons.forEach(button => button.addEventListener('click', function(e) { 
        const clickedNumber = e.target.id;
        if (display.textContent.length < 13) {
            display.textContent += clickedNumber;
            if (!obj.operator) {
                obj.displayVar = parseInt(display.textContent);
                console.log(obj)
            } else {
                obj.secondVar = parseInt(display.textContent);
            }
        }
    }));
}

function setOperators(obj) {
    operatorButtons.forEach(button => button.addEventListener('click', function(e) {
        obj.operator = e.target.id;
        console.log(obj);
        if (!obj.displayVar) {
            return;
        } else {
            console.log(obj);
            display.textContent = '';
        }
    }));
}

function setEquals(obj) {
    equals.addEventListener('click', function(e) {
        if (!obj.secondVar) {
            obj.secondVar = parseInt(display.textContent);
            console.log(obj.secondVar);
        }
        console.log(obj);
        obj.result = operate(obj.operator, obj.displayVar, obj.secondVar);
        console.log(obj.result);
        display.textContent = obj.result;
        obj.displayVar = obj.result;
    });
    
}


main();

/* function setButtons() {
    let displayValue;
    let secondValue;
    let operationValue;
    let result;

    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => button.addEventListener('click', function(e) { 
        const clickedNumber = e.target.id;
        let display = document.querySelector('#display-box');
        if (display.textContent.length < 13) {
            display.textContent += clickedNumber;
            if (operationValue) {
                secondValue = parseInt(display.textContent);
                console.log(displayValue, secondValue, operationValue)
                const equals = document.querySelector('#equals');
                equals.addEventListener('click', function() {
                    console.log(displayValue, secondValue, operationValue)
                    result = operate(operationValue, displayValue, secondValue)
                    document.querySelector('#display-box').textContent = result;
                    displayValue = result;
                    secondValue = null;
                    operationValue = null;
                    console.log(displayValue, secondValue, operationValue)
                });
            } else {
                displayValue = parseInt(display.textContent);
            }
        }
    }));

    const operatorButtons = document.querySelectorAll('.operations');
    operatorButtons.forEach(button => button.addEventListener('click', function(e) {
        document.querySelector('#display-box').textContent = '';
        operationValue = e.target.id;
    }));
}

function setEquals(var1, var2, operation) {
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', function() {
        let result = operate(operation, var1, var2)
        document.querySelector('#display-box').textContent = result;
    })
}


setButtons(); */

/*
function main() {
    // set storage variables
    let operationObject = {};

    //set clear button
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', () => {
        document.querySelector('#display-box').innerText = '';
        delete operationObject.var1;
        delete operationObject.var2;
        delete operationObject.operation;
        delete operationObject.result;
        console.log(operationObject);
    });

    setNumberButtons();

    setOperationsButtons(operationObject);
}

function setNumberButtons() {
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => button.addEventListener('click', function(e) {
        const clickedNumber = e.target.id;
        let display = document.querySelector('#display-box');
        if (display.textContent.length < 13) {
            display.textContent += clickedNumber;
        }
    }));
}

function setOperationsButtons(obj) {
    const operationButtons = document.querySelectorAll('.operations');
    operationButtons.forEach(button => button.addEventListener('click', function(e) {
        obj.operation = e.target.id;
        if (!document.querySelector('#display-box').innerText) {
            return;
        } else if (!obj.var1) {
            obj.var1 = parseInt(document.querySelector('#display-box').innerText);
            document.querySelector('#display-box').innerText = '';
            obj = setEqualsButton(obj);
        }
    }));
}


function setEqualsButton(obj) {
    console.log(obj)
    document.querySelector('#equals').addEventListener('click', function() {
        obj.var2 = parseInt(document.querySelector('#display-box').innerText);
        obj.result = operate(obj.operation, obj.var1, obj.var2);
        console.log(obj);
        document.querySelector('#display-box').innerText = obj.result;
        return obj;
    });
}

main();*/