import Keys from "./Keys";
import handleKey from "./handleKey";
import {CalculatorInternalState, CalculatorState} from "./State";
import getOutput from "./getOutput";

export interface Calculator {
    handleKey: (k: typeof Keys[number]) => void;
    clear: () => void;
    getState: () => CalculatorInternalState;
    output: () => string;
    statement: () => string;
}
export interface CreateCalculatorOptions {
    initialValue?: string;
    defaultZeroText?: string;
    updateCallBack: (i: CalculatorState) => void;
}
export function createCalculator({defaultZeroText, updateCallBack, initialValue}: CreateCalculatorOptions): Calculator {
    const state: CalculatorInternalState = {
        workingStatement: initialValue || '',
        isPartiallyCleared: false,
        defaultZeroText,
        updateCallBack,
    };
    updateCallBack({ statement: state.workingStatement, output: getOutput.bind(state)()});
    return {
        handleKey: handleKey.bind(state),
        clear: () => handleKey.bind(state)('c'),
        getState: () => state,
        output: () => getOutput.bind(state)(),
        statement: () => state.workingStatement,
    }
}
