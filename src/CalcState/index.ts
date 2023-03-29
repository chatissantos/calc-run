import Keys from "./Keys";
import {State} from "./State";
import getOutput from "./getOutput";
import handleKey from "./handleKey";

export interface WorkingStatementInstance {
    get: () => string;
    handleKey: (k: typeof Keys[number]) => void;
    isPartiallyCleared: () => boolean;
    getOutput: () => string;
}
export default function CalcState({defaultZeroText, updateCallBack}: any): WorkingStatementInstance {
    const state: State = {
        workingStatement: '',
        isPartiallyCleared: false,
        defaultZeroText,
        updateCallBack,
    };
    return {
        get: () => state.workingStatement,
        handleKey: handleKey.bind(state),
        isPartiallyCleared: () => state.isPartiallyCleared,
        getOutput: getOutput.bind(state),
    }
}
