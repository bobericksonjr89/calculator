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


function setButtonEvents() {

    clearDisplay();

    // number buttons
    setNumberButtons();

    // operations
    const operationButtons = document.querySelectorAll('.operations');
    operationButtons.forEach(button => button.addEventListener('click', function(e) {
        const operation = e.target.id;
        if (!document.querySelector('#display-box').innerText) {
            return;
        } else if (!var1) {
            const var1 = parseInt(document.querySelector('#display-box').innerText);
            document.querySelector('#display-box').innerText = '';
            let result = setEqualsButton(var1, operation);
            var1 = result;
        } else {

        }
    }))
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


function setEqualsButton(var1, operation) {
    document.querySelector('#equals').addEventListener('click', function() {
        const var2 = document.querySelector('#display-box').innerText;
        const result = operate(operation, var1, var2);
        document.querySelector('#display-box').innerText = result;
        return result;
    });
}

function clearDisplay() {
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', () => {
        document.querySelector('#display-box').innerText = '';
    })
}

setButtonEvents();


function main() {
    // set storage variables
    let operationObject = {};

    //set buttons
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', () => {
        document.querySelector('#display-box').innerText = '';
        delete operationObject.var1;
        delete operationObject.var2;
        delete operationObject.operation;

    })
}

main();