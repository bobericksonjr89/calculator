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
    let result;
    switch(operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            if (num2 == 0) {
                return "Error";
            }
            result = divide(num1, num2);
            break;
        default:
            result = null;
            break;
    }
    let resultString = result.toString();
    if ( resultString.length > 13) {
        if(!resultString.includes('.')) {
            return "Error";
        } else {
            let splitNumbers = resultString.split('.')
            console.log(splitNumbers)
            if (splitNumbers[0].length > 12) {
                return "Error";
            } else {
                let decimalPlaces = 12 - splitNumbers[0].length;
                console.log(decimalPlaces);
                console.log(result, typeof result)
                return result.toFixed(decimalPlaces);
            }
        }
    }
    return result;
}


function main() {
    // global object variable
    let dataObj = {};

    displayNumbers(dataObj);
    setClear(dataObj);
    setOperators(dataObj);
    setEquals(dataObj);
}

function setClear(obj) {
    clear.addEventListener('click', () => {
    obj.displayVar = null;
    obj.secondVar = null;
    obj.operator = null;
    obj.result = null;
    display.textContent = null;
    console.log(obj);
    });
}


function displayNumbers(obj) {
    const decimalButton = document.querySelector('#decimal');
    decimalButton.addEventListener('click', function(e) {
        if (display.textContent.length < 13 && !display.textContent.includes('.')
            && !obj.result) {
            display.textContent += '.';
            if (!obj.displayVar) {
                obj.displayVar = parseFloat(display.textContent);
                console.log(obj);
            } else {
                obj.secondVar = parseFloat(display.textContent);
                console.log(obj);
            }
        }
    });
    console.log(obj);
    numberButtons.forEach(button => button.addEventListener('click', function(e) { 
        const clickedNumber = e.target.id;
        //if (display.textContent == "Error") {
            //display.textContent = '';
        if (obj.result == "Error") {
            return;
        }
        if (!obj.result) {
            if (display.textContent.length < 13) {
                display.textContent += clickedNumber;
                if (!obj.operator) {
                    obj.displayVar = parseFloat(display.textContent);
                    console.log(obj)
                } else {
                    obj.secondVar = parseFloat(display.textContent);
                    console.log(obj);
                }
            }
        } else {
            display.textContent = '';
            obj.result = null;
            display.textContent += clickedNumber;
            obj.secondVar = parseFloat(display.textContent);
            console.log(obj);
        }
    }));
}

function setOperators(obj) {
    operatorButtons.forEach(button => button.addEventListener('click', function(e) {
        if (obj.result == "Error") {
            return;
        } else if (obj.result) {
            obj.operator = e.target.id;
            obj.displayVar = parseFloat(obj.result);
            obj.result = null;
            obj.secondVar = null;
            display.textContent = '';
            console.log(obj);
        } else if (!obj.operator) {
            obj.operator = e.target.id;
            console.log(obj);
            if (!obj.displayVar) {
                return;
            } else {
                console.log(obj);
                display.textContent = '';
            }
        } else {
            obj.result = operate(obj.operator, obj.displayVar, obj.secondVar);
            display.textContent = obj.result;
            obj.displayVar = obj.result;
            obj.operator = e.target.id;
            obj.secondVar = null;
            console.log(obj);
        }
    }));
}

function setEquals(obj) {
    equals.addEventListener('click', function(e) {
        if (obj.result == "Error") {
            return;
        } else if (!obj.secondVar && !obj.result) {
            display.textContent = "Error";
            obj.result = "Error";
            obj.displayVar = null;
            obj.operator = null;
            console.log(obj);
            return;
        } else if (!obj.secondVar) {
            obj.secondVar = parseFloat(display.textContent);
            console.log(obj.secondVar);
        }
        console.log(obj);
        let operationResult = operate(obj.operator, obj.displayVar, obj.secondVar);
        obj.result = parseFloat(operationResult);
        console.log(obj);
        display.textContent = obj.result.toString();
        obj.displayVar = parseFloat(obj.result);
    });
    
}

const display = document.querySelector('#display-box');
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operations');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');

main();