# Calculator

A fully functional calculator in the spirit of a primary school Texas Instruments device.

## Features

- Basic arithmetic: add, subtract, multiply, and divide
- Floating point values with precision
- Consecutive operations 
- Memory features
- Keyboard support

## Floating Point Precision

The display only holds 13 characters.  When a floating point value is longer than 13 characters, its value 
when displayed is rounded to fit the screen, but its more precise value is stored in the cache for future
operations.

## Consecutive Operations

- Calculator behaves differently depending on several variables, just like a real calculator.
- If the calculator is displaying the the results of an operation after a user clicks the equals button,
the user can click a number and it will clear its cache and start fresh, or they can continue to chain operations
together with the displayed result used as a variable by clicking another operator.
- If the user hasn't yet clicked the equals button, they are able to continue to chain operations together,
with the calculator dynamically operating and storing variables.
- If the user clicks the equals button multiple times, it continues to operate based on the last entered
operator and value.

## Memory 

- M+ to add value to memory
- M- to subtract value from memory
- MRC (memory recall) to display stored value on screen

## Keyboard Support

Buttons have click event listeners that will also activate when the corresponding key is pressed
on the keyboard.

## Credit

Robert Erickson, 2021