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

const dataObj = {};
const display = document.querySelector('#display-box');

function setNumbers(obj) {
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => button.addEventListener('click', function(e) {
        displayNumber(e, obj);
    }));
}

function displayNumber(e, obj) {
    if (display.textContent.length < 13) { // permit up to 13 characters on display
        display.textContent += e.target.id;
    }
}

function setOperators(obj) {
    const operatorButtons = document.querySelectorAll('.operations');
    operatorButtons.forEach(button => button.addEventListener('click', function(e) {
        if (display.textContent != '') { // permit click only when value on display
            console.log(obj);
            readyOperator(e, obj);
        }
    }));
}

function readyOperator(e, obj) {
    obj.val1 = parseFloat(display.textContent);
    obj.operator = e.target.id;
    display.textContent = null;
    console.log(obj);
}

function setEquals(obj) {
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', function(e) {
        if (obj.val1 != null && obj.operator != null) { // permit click only when val1 & operator present
            readyOperation(e, obj);
        }
    });
}

function readyOperation(e, obj) {
    if (obj.val2 == null) { // grab val2 from disply if there isn't one already stored
    obj.val2 = parseFloat(display.textContent);
    }
    let result = operate(obj.operator, obj.val1, obj.val2)
    display.textContent = result;
    obj.val1 = result;
    console.log(obj);
}

setNumbers(dataObj);
setOperators(dataObj);
setEquals(dataObj);

/*
function setClear(obj) {
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', () => {
        obj.displayVar = null;
        obj.secondVar = null;
        obj.operator = null;
        obj.result = null;
        obj.memory = 0;
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
            console.log("one") // HERE ADD LOGS TO FIGURE OUT WHICH PATH IS HAPPENINING WHEN NUMBER IS CLICKED AFTER AN OPERATION IS RESOLVED...
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
        } else if (obj.displayVar != null && obj.secondVar != null && obj.operator 
                   && obj.result != null) { //starting fresh
            obj.displayVar = null;
            obj.secondVar = null;
            obj.operator = null;
            obj.result = null;
            display.textContent = null;
            display.textContent = clickedNumber;
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

function setMemory(obj) {
    const memoryButton = document.querySelector('#memory');
    memoryButton.addEventListener('click', () => display.textContent = obj.memory);

    const memoryAdd = document.querySelector('#memory-add');
    memoryAdd.addEventListener('click', () => obj.memory += parseFloat(display.textContent));

    const memorySubtract = document.querySelector('#memory-subtract');
    memorySubtract.addEventListener('click', () => obj.memory -= parseFloat(display.textContent));


}

const display = document.querySelector('#display-box');
const dataObj = {
    memory: 0,
};


displayNumbers(dataObj);
setClear(dataObj);
setOperators(dataObj);
setEquals(dataObj);
setDecimal(dataObj);
setMemory(dataObj);
*/