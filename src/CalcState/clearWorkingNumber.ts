import {State} from "./State";
import {isOperator} from "./Operators";

export default function clearWorkingNumber(this: State) {
    const { workingStatement } = this;
    let l = workingStatement.length - 1;
    while (l >= 0 && !isOperator(workingStatement.charAt(l))) {
        l--;
    }
    this.workingStatement = workingStatement.slice(0, l + 1);
}
