import { useState } from 'react';

import styles from './App.module.css';
import { CalculatorExpressionTranslator } from './calculator/parse-expression';

function App() {
  const DIGITS = Object.freeze(
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']
  );
  const OPERATORS = Object.freeze(['+', '-', '*', '/']);

  const [expression, setExpression] = useState('');

  function makeInputEntryEventHandler(entry: string) {
    return () => setExpression(expression + entry);
  }

  function handleCalculate() {
    const translator = new CalculatorExpressionTranslator(expression);
    setExpression(translator.translate().evaluate().toString());
  }

  return (
    <article className={styles.calculator}>
      <div>
        <output data-testid="display">{expression}</output>
      </div>
      <div className={styles.input}>
        <div className={styles.digit}>
        {DIGITS.map((digit) =>
          <button
            type="button" 
            onClick={makeInputEntryEventHandler(digit)}
          >
          {digit}
          </button>
        )}
      </div>
        <div className={styles['basic-operator']}>
        {OPERATORS.map((operator) =>
          <button
            type="button"
            onClick={makeInputEntryEventHandler(operator)}
          >
          {operator}
          </button>
        )}
        </div>
        <div className={styles['display-operator']}>
          <button
            type="button"
            onClick={handleCalculate}
          >
            =
          </button>
        </div>
      </div>
    </article>
  );
}

export default App;
