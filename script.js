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
    return result;
}

function checkResultLength(result) {
    if (result.toString().length > 13) { //only 13 characters
        return roundFloat(result);
    }
    return result;
}

function roundFloat(number) {
    let numberString = number.toString();
    if(!numberString.includes('.')) {
        return "Error";
    } else {
        let splitNumbers = numberString.split('.')

        if (splitNumbers[0].length > 12) { // 12 bc decimal takes up a character
            return "Error";
        } else {
            let decimalPlaces = 11 - splitNumbers[0].length;
            let roundedNumber = number.toFixed(decimalPlaces).toString();
            let trimmedNumber = roundedNumber.replace(/0+$/,'');
            return trimmedNumber;
        }
    }
}

function setClear(obj) {
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', function() {
        clearData(obj);
    })
}

function clearData(obj) {
    clearStatus(obj);
    clearCache(obj);
    obj.memory = 0;
    display.textContent = '';
}

function clearCache(obj) {
    obj.val1 = null;
    obj.val2 = null;
    obj.operator = null;
}

function clearStatus(obj) {
    obj.isDisplayingResult = false;
    obj.isEqualsClicked = false;
    obj.isDisplayingMemory = false;
}

function setNumbers(obj) {
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => button.addEventListener('click', function(e) {
        if (display.textContent === "Error") {
            return;
        }
        if (obj.isDisplayingMemory === true) {
            display.textContent = '';
            obj.isDisplayingMemory = false;
        }
        displayNumber(e, obj);
    }));

    const decimalButton = document.querySelector('#decimal');
    decimalButton.addEventListener('click', function(e) {
        if (display.textContent.length < 13 && !display.textContent.includes('.')) {
            if (obj.isEqualsClicked === true ) {
                // clear values except memory
                clearCache(obj);
                clearStatus(obj);
                display.textContent = '.';
                return;
            } else if (obj.isDisplayingResult || obj.isDisplayingMemory) {
                display.textContent = '';
                clearStatus(obj);
            }
            display.textContent += '.';
        }
    });
}

function displayNumber(e, obj) {
     if (obj.isEqualsClicked === true) { // clear display & cache if displaying result
        clearCache(obj);
        display.textContent = e.target.id;
        clearStatus(obj);
        return;
    } else if (obj.isDisplayingResult) {
        display.textContent = '';
        obj.isDisplayingResult = false;
    }

    if (display.textContent.length < 13) { // permit up to 13 characters on display
        display.textContent += e.target.id;
    }
}
 
function setOperators(obj) {
    const operatorButtons = document.querySelectorAll('.operations');
    operatorButtons.forEach(button => button.addEventListener('click', function(e) {
        if (display.textContent == '' || display.textContent == "Error") { // permit click only when value on display
            return;
        } else if (!obj.isEqualsClicked) {
            if (!obj.val1) {
                obj.val1 = parseFloat(display.textContent);
                display.textContent = '';
                obj.operator = e.target.id;
            } else if (obj.isDisplayingResult) {
                obj.val1 = parseFloat(display.textContent);
                let result = parseFloat(operate(obj.operator, obj.val1, obj.val2));
                display.textContent = checkResultLength(result);
                obj.operator = e.target.id;
                obj.isDisplayingResult = true;
                obj.val1 = result;
                console.log(obj);
            } else {
                obj.val2 = parseFloat(display.textContent);
                let result = parseFloat(operate(obj.operator, obj.val1, obj.val2));
                display.textContent = checkResultLength(result);
                obj.operator = e.target.id;
                obj.isDisplayingResult = true;
                //obj.val2 = null;
                obj.val1 = result;
            }
        } else {
            obj.val1 = parseFloat(display.textContent);
            display.textContent = '';
            obj.val2 = null;
            obj.operator = e.target.id;
            clearStatus(obj);
        }    
    }));
}

function setMemory(obj) {
    const memoryAddButton = document.querySelector('#memory-add');
    memoryAddButton.addEventListener('click', function() {
        obj.memory += parseFloat(display.textContent);
        display.textContent = '';
    });

    const memorySubtractButton = document.querySelector('#memory-subtract');
    memorySubtractButton.addEventListener('click', function() {
        obj.memory -= parseFloat(display.textContent);
        display.textContent = '';
    });
    const memoryRecallButton = document.querySelector('#memory');
    memoryRecallButton.addEventListener('click', function() {
        displayMemory(obj);
    });
}

function displayMemory(obj) {
    display.textContent = obj.memory;
    obj.isDisplayingResult = false;
    obj.isDisplayingMemory = true;
}

function setEquals(obj) {
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', function() {
        if (display.textContent === "Error" || display.textContent == '' || typeof obj.val1 != "number" || !obj.operator) {
            return;
        } else if (!obj.isEqualsClicked) {
            obj.val2 = parseFloat(display.textContent);
            let result = parseFloat(operate(obj.operator, obj.val1, obj.val2));
            display.textContent = checkResultLength(result);
            obj.isEqualsClicked = true;
            obj.isDisplayingResult = true;
            obj.val1 = result;
        } else {
            let result = parseFloat(operate(obj.operator, obj.val1, obj.val2));
            display.textContent = checkResultLength(result);
            obj.val1 = result;
        }
    });
}

// keyboard support
document.addEventListener('keyup', (e) => {
    let key = e.key;
    if (key === "Enter") {
        key = "equals";
    } else if (key === ".") {
        key = "decimal"
    } else if (key === "Delete") {
        key = "clear"
    }
    if (!document.getElementById(key)) {
        return;
    }
    document.getElementById(key).click();
});

const dataObj = {
    memory: 0,
};
const display = document.querySelector('#display-box');

setNumbers(dataObj);
setOperators(dataObj);
setEquals(dataObj);
setClear(dataObj);
setMemory(dataObj);
