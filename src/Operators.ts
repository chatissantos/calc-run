export enum Operator {
    addition = '+',
    subtraction = '-',
    multiplication = '*',
    division = '/',
}
export const OPERATORS: string[] = [Operator.addition, Operator.subtraction, Operator.multiplication, Operator.division];
export const ADDITION_OPERATORS: string[] = [Operator.subtraction, Operator.addition];
export function isOperator(key: string): boolean {
    return OPERATORS.indexOf(key as Operator) >= 0;
}
