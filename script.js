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
            let decimalPlaces = 6 - splitNumbers[0].length;
            console.log(decimalPlaces);
            console.log(number, typeof number)
            return number.toFixed(decimalPlaces);
        }
    }
}

const dataObj = {};
const display = document.querySelector('#display-box');

function setClear(obj) {
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', function() {
        clearData(obj);
    })
}

function clearData(obj) {
    obj.val1 = null;
    obj.val2 = null;
    obj.operator = null;
    obj.isDisplayingResult = false;
//    obj.continue = false;
    obj.isEqualsClicked = false;
    display.textContent = '';
    console.log(obj);
}

function setNumbers(obj) {
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => button.addEventListener('click', function(e) {
        if (display.textContent === "Error") {
            return;
        }
        displayNumber(e, obj);
    }));
}

function displayNumber(e, obj) {
     if (obj.isEqualsClicked === true) { // clear display if displaying result
        clearData(obj); // and clear values from memory
        display.textContent = e.target.id;
        console.log(obj);
        return;
    } else if (obj.isDisplayingResult) {
        display.textContent = '';
    }
/*    if (obj.continue === true) {
        display.textContent = e.target.id;
        console.log(obj);
        return;
    } */
    if (display.textContent.length < 13) { // permit up to 13 characters on display
        display.textContent += e.target.id;
        console.log(obj);
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
                console.log(obj);
            } else {
                obj.val2 = parseFloat(display.textContent);
                display.textContent = parseFloat(operate(obj.operator, obj.val1, obj.val2));
                obj.operator = e.target.id;
                obj.isDisplayingResult = true;
                obj.val2 = null;
                obj.val1 = parseFloat(display.textContent);
                console.log(obj);
            }
        } else {
            obj.val1 = parseFloat(display.textContent);
            display.textContent = '';
            obj.val2 = null;
            obj.operator = e.target.id;
            obj.isEqualsClicked = false;
            console.log(obj);
        } 

            //we'll always clear the display after operator clicked
            //and we'll store current value into val1 if not doing consecutive operations
            //if equals hasn't been clicked yet.
            //readyOperator(e, obj);
        
    }));
}
/*
function readyOperator(e, obj) {
    //check to see if doing consectutive operations
    //we'll test that by seeing if there's already an inputed value,
    //if there's an inputed operator, and a current value typed in
    if (obj.val1 !== null && obj.operator !== null && display.textContent != '') {
        obj.val1 = display.textContent;
        obj.val2 = null;
        obj.operator = e.target.id;

    }
    if (obj.continue === true) {
        readyOperation(obj);
        obj.operator = e.target.id;
        console.log(obj, 125)
        return;
    } else if (obj.result === true) {
        display.textContent = '';
        obj.operator = e.target.id;
        obj.result = false;
        obj.val2 = null;
        console.log(obj, 132);
        return;
    } else if (obj.val1) {
        obj.val2 = parseFloat(display.textContent);
        readyOperation(obj);
        console.log(obj);
        obj.operator = e.target.id;
        obj.val2 = null;
        obj.continue = true;
        return;
    }
    obj.val1 = parseFloat(display.textContent);
    obj.operator = e.target.id;
    display.textContent = null;
    console.log(obj);
}
*/
function setEquals(obj) {
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', function() {
        if (display.textContent === "Error" || display.textContent == '' || !obj.val2) {
            return;
        } //else if (obj.val1 != null && obj.operator != null) { // permit click only when val1 & operator present
            //obj.hitEquals = true;
            //readyOperation(obj);
            //obj.continue = false;
        //}
    });
}
/*
function readyOperation(obj) {
    if (obj.val2 == null) { // grab val2 from disply if there isn't one already stored
    obj.val2 = parseFloat(display.textContent);
    }
    let result = parseFloat(operate(obj.operator, obj.val1, obj.val2)) // why do I sometimes get a string?
    if (isNaN(result)) {
        display.textContent = "Error";
        return;
    }
    display.textContent = result;
    obj.val1 = result;
    obj.result = true; // true = calculator is displaying result
    //obj.continue = false;
    console.log(obj);
} */

setNumbers(dataObj);
setOperators(dataObj);
//setEquals(dataObj);
setClear(dataObj);

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