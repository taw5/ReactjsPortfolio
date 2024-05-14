// Calculator.js
import React, { useState } from 'react';
import Button from './Button';

export default function Calculator() {
    const [expression, setExpression] = useState(''); // usestate string version 
    const [result, setResult] = useState(0);
    const [previousResult, setPreviousResult] = useState(null);
    const handleButtonClick = (value) => { // basically a function
        if (value === '=') {
            try {
                setResult((prevResult) => {
                    const newResult =parseFloat(eval(expression).toFixed(4)); // Evaluate the entire expression
                    setResult(newResult);
                    setExpression(newResult); // Set the expression to the new result for further operations
                })
               
            } catch (error) {
                setResult('Error');
            }
            setExpression('');
        } else if (value === 'AC') {

            console.log("Before" +expression);

            setExpression('');
            setResult(0); // makes it 0
            setPreviousResult(null);
            console.log("After" + expression);

        } else if (value === '+/-') {
            console.log("Before" +expression);

            setResult(result*-1);
            
            
                setExpression(prevExpression => {if (prevExpression.charAt(0) === '-') {  return prevExpression.slice(1);} else {return '-' + prevExpression;}})
                    
               
            }
                

        
            else if (value === '÷') {
                setPreviousResult(eval(expression));
                setExpression((prevExpression) => prevExpression + '/');
            } else if (value === 'X') {
                setPreviousResult(eval(expression));
                setExpression((prevExpression) => prevExpression + '*');
            } else if (value === '+') {
                setPreviousResult(eval(expression));
                setExpression((prevExpression) => prevExpression + '+');
            } else if (value === '-') {
                setPreviousResult(eval(expression));
                setExpression((prevExpression) => prevExpression + '-');
            } else {
                setResult(value);
                setExpression((prevExpression) => prevExpression + value);
            }

    };

    return (
        <div className="rounded-lg p-5 bg-gray-100 shadow-lg my-5 flex flex-col items-center w-96">
            <div className="bg-gray-800 text-white text-right mb-4 text-2xl font-bold rounded-t-lg p-3 w-full">
                Result: {result}
            </div>
            <div className="grid grid-cols-4 gap-3 justify-items-center w-full">
                <Button onClick={() => handleButtonClick('AC')}>AC</Button> 
                <Button onClick={() => handleButtonClick('+/-')}>+/-</Button>
                <Button onClick={() => handleButtonClick('%')}>%</Button>
                <Button onClick={() => handleButtonClick('÷')}>÷</Button>
                <Button onClick={() => handleButtonClick('7')}>7</Button>
                <Button onClick={() => handleButtonClick('8')}>8</Button>
                <Button onClick={() => handleButtonClick('9')}>9</Button>
                <Button onClick={() => handleButtonClick('X')}>X</Button>
                <Button onClick={() => handleButtonClick('6')}>6</Button>
                <Button onClick={() => handleButtonClick('5')}>5</Button>
                <Button onClick={() => handleButtonClick('4')}>4</Button>
              
                <Button onClick={() => handleButtonClick('-')}>-</Button>
                <Button onClick={() => handleButtonClick('3')}>3</Button>
                <Button onClick={() => handleButtonClick('2')}>2</Button>
                <Button onClick={() => handleButtonClick('1')}>1</Button>
                <Button onClick={() => handleButtonClick('+')}>+</Button>
                <Button onClick={() => handleButtonClick('0')}>0</Button>
                <Button onClick={() => handleButtonClick('.')}>.</Button>
                <Button onClick={() => handleButtonClick('=')} >=</Button>
            </div>
        </div>
    );
}
