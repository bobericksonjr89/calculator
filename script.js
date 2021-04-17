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

function main() {
    // global variables
    let displayVar;
    let secondVar;
    let operator;
    let result;

    displayNumbers(displayVar, secondVar, operator);
}


function displayNumbers(displayVar, secondVar, operator) {
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => button.addEventListener('click', function(e) { 
        const clickedNumber = e.target.id;
        const display = document.querySelector('#display-box');
        if (display.textContent.length < 13) {
            display.textContent += clickedNumber;
            if (!displayVar) {
                displayVar = parseInt(display.textContent);
                setOperators(displayVar, secondVar, operator);
            } else {
                
                secondVar = display.textContent;
            }
        }
    }));
}

function setOperators(displayVar, secondVar, operator) {
    const operatorButtons = document.querySelectorAll('.operations');
    operatorButtons.forEach(button => button.addEventListener('click', function(e) {
        operator = e.target.id;
        console.log(operator, displayVar);
        if (!displayVar) {
            return;
        } else {
            console.log(displayVar, secondVar, operator);
            document.querySelector('#display-box').textContent = '';
            setEquals(displayVar, secondVar, operator);
        }
    }))
}

function setEquals(displayVar, secondVar, operator) {
    document.querySelector('#equals').addEventListener('click', function(e) {
        const display = document.querySelector('#display-box');
        if (!secondVar) {
            secondVar = parseInt(display.textContent);
        }
        console.log(displayVar, secondVar, operator);
        let result = operate(operator, displayVar, secondVar);
        display.textContent = result;
        displayVar = result;

    })
    
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