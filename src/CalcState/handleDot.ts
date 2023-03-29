import hasBeenEvaluated from "./hasBeenEvaluated";
import {State} from "./State";

export default function handleDot(this: State) {
    const { workingStatement } = this;
    if (workingStatement.includes('.')) {
        return;
    }
    if(!workingStatement.length) {
        this.workingStatement = '0.';
        return;
    }
    if(hasBeenEvaluated(workingStatement)) {
        this.workingStatement = `${workingStatement.slice(workingStatement.indexOf('=') + 1)}.`;
        return;
    }
    this.workingStatement += '.';
}
