import Keys from "./Keys";
import hasBeenEvaluated from "./hasBeenEvaluated";
import {State} from "./State";

export default function handleNumber(this: State, value: typeof Keys[number]) {
    const { workingStatement } = this;
    if(hasBeenEvaluated(workingStatement)) {
        this.workingStatement = value;
        return;
    }
    if(!workingStatement.length && value === '0') {
        return;
    }
    this.workingStatement += value;
}
