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
    if (result.toString().length > 13) { //only 13 characters
        result = roundFloat(result)
    }
    return result;
}

function roundFloat(number) {
    let numberString = number.toString();
    if(!numberString.includes('.')) {
        return "Error";
    } else {
        let splitNumbers = numberString.split('.')
        console.log(splitNumbers)
        if (splitNumbers[0].length > 12) { // 12 bc decimal takes up a character
            return "Error";
        } else {
            let decimalPlaces = 12 - splitNumbers[0].length;
            console.log(decimalPlaces);
            console.log(number, typeof number)
            return number.toFixed(decimalPlaces);
        }
    }
}

function setClear(obj) {
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', () => {
        obj.displayVar = null;
        obj.secondVar = null;
        obj.operator = null;
        obj.result = null;
        display.textContent = null;
        console.log(obj);
    });
}

function setDecimal(obj) {
    const decimalButton = document.querySelector('#decimal');
    decimalButton.addEventListener('click', function(e) {
        if (display.textContent.length < 13 && !display.textContent.includes('.')
            && obj.result == null) {
            display.textContent += '.';
            if (obj.displayVar == null) {
                obj.displayVar = parseFloat(display.textContent);
                console.log(obj);
            } else {
                obj.secondVar = parseFloat(display.textContent);
                console.log(obj);
            }
        }
    });
}

function displayNumbers(obj) {
    console.log(obj);
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => button.addEventListener('click', function(e) { 
        const clickedNumber = e.target.id;
        if (obj.result == "Error") { // deactivate buttons when error message
            return;
        }
        if (obj.result == null) { // starting fresh
            if (display.textContent.length < 13) {
                display.textContent += clickedNumber;
                if (!obj.operator) { // continue storing number 1
                    obj.displayVar = parseFloat(display.textContent);
                    console.log(obj)
                } else { // if there's an operater, ready for number 2
                    obj.secondVar = parseFloat(display.textContent);
                    console.log(obj);
                }
            }
        } else { // if there's a result, it's number 1, and we need number 2
            display.textContent = null;
            obj.result = null;
            display.textContent += clickedNumber;
            obj.secondVar = parseFloat(display.textContent);
            console.log(obj);
        }
    }));
}

function setOperators(obj) {
    const operatorButtons = document.querySelectorAll('.operations');
    operatorButtons.forEach(button => button.addEventListener('click', function(e) {
        if (obj.result == "Error" || obj.displayVar == null) { // ignore if no numbers
            return;
        } else if (obj.result) {
            obj.operator = e.target.id;
            obj.displayVar = parseFloat(obj.result);
            obj.result = null;
            obj.secondVar = null;
            display.textContent = null;
            console.log(obj);
        } else if (!obj.operator) {
            obj.operator = e.target.id;
            console.log(obj);
            if (obj.displayVar == null) {
                display.textContent = null;
                return;
            } else {
                console.log(obj);
                display.textContent = null;
            }
        } else {
            obj.result = parseFloat(operate(obj.operator, obj.displayVar, obj.secondVar));
            if (isNaN(obj.result)) {
                obj.result = "Error";
            }
            display.textContent = obj.result;
            obj.displayVar = obj.result;
            obj.operator = e.target.id;
            obj.secondVar = null;
            console.log(obj);
        }
    }));
}

function setEquals(obj) {
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', function(e) {
        if (obj.result == "Error" || obj.displayVar == null) { // ignore if no numbers
            return;
        } else if (obj.secondVar == null && obj.result == null) {
            display.textContent = "Error";
            obj.result = "Error";
            obj.displayVar = null;
            obj.operator = null;
            console.log(obj);
            return;
        } else if (obj.secondVar == null) {
            obj.secondVar = parseFloat(display.textContent);
            console.log(obj.secondVar);
        }
        console.log(obj);
        let operationResult = operate(obj.operator, obj.displayVar, obj.secondVar);
        obj.result = parseFloat(operationResult);
        if (isNaN(obj.result)) {
            obj.result = "Error";
        }
        console.log(obj);
        display.textContent = obj.result.toString();
        obj.displayVar = parseFloat(obj.result);
    });
    
}

const display = document.querySelector('#display-box');
const dataObj = {};

displayNumbers(dataObj);
setClear(dataObj);
setOperators(dataObj);
setEquals(dataObj);
setDecimal(dataObj);