import containsOperator from "./containsOperator";
import endsWithOperator from "./endsWithOperator";
import hasBeenEvaluated from "./hasBeenEvaluated";
import {CalculatorInternalState} from "./State";

export default function handleEqual(this: CalculatorInternalState) {
    const { workingStatement } = this;
    if(shouldEvaluate(workingStatement)) {
        this.workingStatement = `${workingStatement}=${eval(workingStatement)}`;
    }
}

function shouldEvaluate(ws: string):boolean {
    return !hasBeenEvaluated(ws) && containsOperator(ws) && !endsWithOperator(ws);
}
