import hasBeenEvaluated from "./hasBeenEvaluated";
import {State} from "./State";

export default function handleBackSpace(this: State) {
    const { workingStatement } = this;
    if (workingStatement.length) {
        if (hasBeenEvaluated(workingStatement)) {
            this.workingStatement = '';
        } else {
            this.workingStatement = workingStatement.slice(0, workingStatement.length - 1);
        }
    }
}
