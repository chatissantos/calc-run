import containsOperator from "./containsOperator";
import clearWorkingNumber from "./clearWorkingNumber";
import hasBeenEvaluated from "./hasBeenEvaluated";
import {CalculatorInternalState} from "./State";

export default function handleClear(this: CalculatorInternalState) {
    const {workingStatement, isPartiallyCleared} = this;
    if (hasBeenEvaluated(workingStatement)) {
        this.workingStatement = '';
        this.isPartiallyCleared = false;
        return;
    }
    if (isPartiallyCleared || !containsOperator(workingStatement)) {
        this.workingStatement = '';
    } else {
        clearWorkingNumber.bind(this)();
    }
    this.isPartiallyCleared = !isPartiallyCleared;
}
