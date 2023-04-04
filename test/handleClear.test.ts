import {describe, expect, test, vi} from "vitest";
import {CalculatorInternalState} from "../src/State";
import handleClear from "../src/handleClear";

describe('Handle Clear', () => {
    const updateCallBack = vi.fn();
    test('should clear one character', () => {
        const state: CalculatorInternalState = {
            isPartiallyCleared: false,
            updateCallBack,
            workingStatement: '1'
        };
        handleClear.bind(state)();
        expect(state.workingStatement).toEqual('');
    });
    test('should completely clear if ws has been evaluated', () => {
        const state: CalculatorInternalState = {
            isPartiallyCleared: false,
            updateCallBack,
            workingStatement: '5*5=25'
        };
        handleClear.bind(state)();
        expect(state.workingStatement).toEqual('');
    });
    test('should partially clear working number then clear entire string', () => {
        const state: CalculatorInternalState = {
            isPartiallyCleared: false,
            updateCallBack,
            workingStatement: '2*442'
        };
        handleClear.bind(state)();
        expect(state.workingStatement).toEqual('2*');
        handleClear.bind(state)();
        expect(state.workingStatement).toEqual('');
    });
});
