# Calculator State Management Library

This is a JavaScript library that provides functions to manage the state of a calculator. With this library, you can easily implement a functioning calculator in any front-end library of your choice, including vanilla JS, React, Svelte, SolidJS, Lit, Vue, Angular, and more.

## Installation

You can install this library via NPM:

```
npm install calc-run --save
```

## Usage

To use the library, you need to import it into your JavaScript file:

```
import { createCalculator } from 'calc-run';
```

# Creating a Calculator

To create a new calculator, you can use the createCalculator function. This function takes an optional initial value and returns a calculator object that has the following properties:

- statement: a function that returns the current statement in the calculator's state
- output: a function that returns the current output
- handleKey: a function to trigger the input of a key

Here's an example of creating a new calculator with an initial value of 10:

```
const calculator = createCalculator({ initialValue: 10 });
```

# Using the Calculator

Once you have a calculator object, you can use its properties to perform calculations. For example, to add 5 to the current value of the calculator, you can call the `handleKey` function:

```
calculator.handleKey('+');
calculator.handleKey('5');
calculator.handleKey('=');
console.log(calculator.statement()); // statement: 10+5=15
console.log(calculator.output()); // output: 15
```

Similarly, you can subtract, multiply, or divide the current value of the calculator:

```
calculator.handleKey('-');
calculator.handleKey('3');
calculator.handleKey('=');
console.log(calculator.output()); // output: 12

calculator.handleKey('*');
calculator.handleKey('2');
calculator.handleKey('=');
console.log(calculator.output()); // output: 24

calculator.handleKey('/');
calculator.handleKey('4');
calculator.handleKey('=');
console.log(calculator.output()); // output: 6
```

You can also clear the current value of the calculator:

```
calculator.clear(); // or calculator.handleKey('c'); 
console.log(calculator.output()); // output: 0
```

## Examples

Here's an example of using the calc-run library in a React component:

```
import React, { useState } from 'react';
import { createCalculator } from 'calc-run';

function MiniCalc() {
    const [state, setState] = useState();
    const calculator = useMemo(() => createCalculator({ updateCallBack: setState }), []);

    if (!state) {
        return null;
    }

    return (
        <div>
            <p>Statement: {state.statement}</p>
            <p>Output: {state.output}</p>
            <button onClick={() => calculator.handleKey('1')}>1</button>
            <button onClick={() => calculator.handleKey('2')}>2</button>
            <button onClick={() => calculator.handleKey('3')}>3</button>
            <button onClick={() => calculator.handleKey('+')}>Plus</button>
            <button onClick={() => calculator.handleKey('-')}>Minus</button>
            <button onClick={() => calculator.handleKey('=')}>Equals</button>
        </div>
    );
}
```

## Conclusion

The calculator state management library provides an easy way to manage the state of a calculator in any front-end library of your choice. With this library, you can focus on building the UI for your calculator, while the calc-run takes care of the state management.
