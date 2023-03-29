import {Operator} from "./Operators";
import endsWithOperator from "./endsWithOperator";
import hasBeenEvaluated from "./hasBeenEvaluated";
import {State} from "./State";

export default function handleOperator(this: State, key: Operator) {
    const { workingStatement } = this;
    if (workingStatement.length >= 1) {
        if(hasBeenEvaluated(workingStatement)) {
            this.workingStatement = `${workingStatement.slice(workingStatement.indexOf('=') + 1)}${key}`;
            return;
        }
        if (endsWithOperator(workingStatement)) {
            this.workingStatement = workingStatement.slice(0, workingStatement.length - 1);
        }
        this.workingStatement += key;
    }
}
