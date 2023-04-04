import hasBeenEvaluated from "./hasBeenEvaluated";
import {CalculatorInternalState} from "./State";

export default function handleBackSpace(this: CalculatorInternalState) {
    const { workingStatement } = this;
    if (workingStatement.length) {
        if (hasBeenEvaluated(workingStatement)) {
            this.workingStatement = '';
        } else {
            this.workingStatement = workingStatement.slice(0, workingStatement.length - 1);
        }
    }
}
