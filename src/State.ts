export interface CalculatorState {
    statement: string;
    output: string;
}
export interface CalculatorInternalState {
    workingStatement: string;
    isPartiallyCleared: boolean;
    defaultZeroText?: string;
    updateCallBack: ({ statement, output }: CalculatorState) => void,
}
