import { describe, expect, test } from '@jest/globals';

import {
  AdditionExpression,
  CalculatorExpressionTranslator,
  DivisionExpression,
  MultiplicationExpression,
  Operand,
  SubtractionExpression
} from '../../src/calculator/parse-expression';

describe('A number is that number in an expression', () => {
  test('One-digit number', () => {
    const translator = new CalculatorExpressionTranslator('7');
    expect(translator.translate()).toEqual(new Operand(7));
  });

  test('Multi-digit number', () => {
    const translator = new CalculatorExpressionTranslator('395');
    expect(translator.translate()).toEqual(new Operand(395));
  });

  test('Negative number', () => {
    const translator = new CalculatorExpressionTranslator('-81');
    expect(translator.translate()).toEqual(new Operand(-81));
  });

  test('Number with decimal point', () => {
    const translator = new CalculatorExpressionTranslator('2.64');
    expect(translator.translate()).toEqual(new Operand(2.64));
  });
});

describe('Basic operators between two numbers', () => {
  test('Addition results in their sum', () => {
    const translator = new CalculatorExpressionTranslator('84+23');
    expect(translator.translate()).toEqual(new AdditionExpression(
      new Operand(84), new Operand(23)
    ));
  });

  test('Subtraction results in their difference', () => {
    const translator = new CalculatorExpressionTranslator('57-19');
    expect(translator.translate()).toEqual(new SubtractionExpression(
      new Operand(57), new Operand(19)
    ));
  });

  test('Multiplication results in their product', () => {
    const translator = new CalculatorExpressionTranslator('12*6');
    expect(translator.translate()).toEqual(new MultiplicationExpression(
      new Operand(12), new Operand(6)
    ));
  });

  test('Division results in their quotient', () => {
    const translator = new CalculatorExpressionTranslator('150/25');
    expect(translator.translate()).toEqual(new DivisionExpression(
      new Operand(150), new Operand(25)
    ));
  });
});