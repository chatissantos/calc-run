import {ADDITION_OPERATORS, isOperator} from "./Operators";
import {State} from "./State";
import hasBeenEvaluated from "./hasBeenEvaluated";
import lastChar from "./lastChar";
import endsWithOperator from "./endsWithOperator";

export default function getOutput(this: State): string {
    const { defaultZeroText, isPartiallyCleared, workingStatement } = this;
    const defaultValue = defaultZeroText || '0';
    if (isPartiallyCleared || !workingStatement.length) {
        return defaultValue;
    }
    if(hasBeenEvaluated(workingStatement)) {
        return workingStatement.slice(workingStatement.indexOf('=') + 1);
    }
    if(endsWithOperator(workingStatement)) {
        let stringToEval = '';
        if (ADDITION_OPERATORS.indexOf(lastChar(workingStatement)) >= 0) {
            stringToEval = workingStatement.slice(0, workingStatement.length - 1);
        } else {
            let i = workingStatement.length - 1;
            while (ADDITION_OPERATORS.indexOf(workingStatement.charAt(i)) < 0 && i >= 0) {
                i -= 1;
            }
            stringToEval = workingStatement.slice(i + 1, workingStatement.length - 1);
        }
        return `${eval(stringToEval)}`
    }
    const output = workingStatement;
    let l = output.length - 1;
    while (l >= 0 && !isOperator(output.charAt(l))) {
        l--;
    }
    return output.slice(l + 1);
}
