export interface MathExpression {
  evaluate(): number;
}

export class Operand implements MathExpression {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  evaluate(): number {
    return this.value;
  }
}

export abstract class OperatorExpression implements MathExpression {
  protected readonly operands: MathExpression[];

  constructor(...operands: MathExpression[]) {
    this.operands = operands;
  }

  abstract evaluate(): number
}

export class AdditionExpression extends OperatorExpression {
  evaluate(): number {
    return this.operands.reduce(
      (previous, current) => previous + current.evaluate(),
      0);
  }
}

export class SubtractionExpression extends OperatorExpression {
  evaluate(): number {
    return this.operands.slice(1).reduce(
      (previous, current) => previous - current.evaluate(),
      this.operands[0].evaluate());
  }
}

export class MultiplicationExpression extends OperatorExpression {
  evaluate(): number {
    return this.operands.slice(1).reduce(
      (previous, current) => previous * current.evaluate(),
      this.operands[0].evaluate());
  }
}

export class DivisionExpression extends OperatorExpression {
  evaluate(): number {
    return this.operands.slice(1).reduce(
      (previous, current) => previous / current.evaluate(),
      this.operands[0].evaluate());
  }
}

export class CalculatorExpressionTranslator {
  private readonly expressionText: string;

  constructor(expression: string) {
    this.expressionText = expression;
  }

  translate(): MathExpression {
    if (this.isAddition()) {
      return this.makeAdditionExpression();
    } else if (this.isSubtraction()) {
      return this.makeSubtractionExpression();
    } else if (this.isMultiplication()) {
      return this.makeMultiplicationExpression();
    } else if (this.isDivision()) {
      return this.makeDivisionExpression();
    }
    return new Operand(+this.expressionText);
  }

  private isAddition(): boolean {
    const ADDITION_EXPRESSION = /\d+\+\d+/;
    return <boolean><unknown>this.expressionText.match(ADDITION_EXPRESSION);
  }

  private makeAdditionExpression(): AdditionExpression {
    const operands = this.expressionText.match(/\d+\.?\d*/g);
    if (operands) {
      return new AdditionExpression(
        ...operands.map((match) => new Operand(+match))
      );
    }
    return new AdditionExpression();
  }

  private isSubtraction(): boolean {
    const SUBTRACTION_EXPRESSION = /\d+\-\d+/;
    return <boolean><unknown>this.expressionText.match(SUBTRACTION_EXPRESSION);
  }

  private makeSubtractionExpression(): SubtractionExpression {
    const operands = this.expressionText.match(/\d+\.?\d*/g);
    if (operands) {
      return new SubtractionExpression(
        ...operands.map((match) => new Operand(+match))
      );
    }
    return new SubtractionExpression();
  }

  private isMultiplication(): boolean {
    const MULTIPLICATION_EXPRESSION = /\d+\*\d+/;
    return <boolean><unknown>this.expressionText.match(MULTIPLICATION_EXPRESSION);
  }

  private makeMultiplicationExpression(): MultiplicationExpression {
    const operands = this.expressionText.match(/\d+\.?\d*/g);
    if (operands) {
      return new MultiplicationExpression(
        ...operands.map((match) => new Operand(+match))
      );
    }
    return new MultiplicationExpression();
  }

  private isDivision(): boolean {
    const DIVISION_EXPRESSION = /\d+\/\d+/;
    return <boolean><unknown>this.expressionText.match(DIVISION_EXPRESSION);
  }

  private makeDivisionExpression(): DivisionExpression {
    const operands = this.expressionText.match(/\d+\.?\d*/g);
    if (operands) {
      return new DivisionExpression(
        ...operands.map((match) => new Operand(+match))
      );
    }
    return new DivisionExpression();
  }
}