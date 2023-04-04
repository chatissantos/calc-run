import {describe, expect, test, vi} from "vitest";
import { createCalculator } from "../src";
import { Operator } from "../src/Operators";

describe('CalcState', () => {
    const updateCallBack = vi.fn();
    describe('Clear', () => {
        test('should clear one character', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('1');
            calc.handleKey('c');
            expect(calc.statement()).toEqual('');
        });
        test('should completely clear if ws has been evaluated', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('5');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('5');
            calc.handleKey('=');
            calc.handleKey('c');
            expect(calc.statement()).toEqual('');
        });
        test('should partially clear working number then clear entire string', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('4');
            calc.handleKey('2');
            expect(calc.statement()).toEqual('2*442');
            calc.handleKey('c');
            expect(calc.statement()).toEqual('2*');
            calc.handleKey('c');
            expect(calc.statement()).toEqual('');
        });
        test('should reset partially clear when a number is entered', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('2');
            expect(calc.statement()).toEqual('2*42');
            calc.handleKey('c');
            expect(calc.statement()).toEqual('2*');
            expect(calc.getState().isPartiallyCleared).toEqual(true);
            calc.handleKey('5');
            expect(calc.getState().isPartiallyCleared).toEqual(false);
        });
    });
    describe('Backspace', () => {
        test('should handle empty statement', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('bs');
            expect(calc.statement()).toEqual('');
        })
        test('should handle number ending', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.division);
            calc.handleKey('7');
            calc.handleKey('bs');
            expect(calc.statement()).toEqual('2/');
        })
        test('should handle operator ending', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.division);
            calc.handleKey('bs');
            expect(calc.statement()).toEqual('2');
        })
        test('should an evaluated statement', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.statement()).toEqual('2*4=8');
            calc.handleKey('bs');
            expect(calc.statement()).toEqual('');
        })
    });
    describe('Operator', () => {
        test('should handle an evaluated statement', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.statement()).toEqual('2*4=8');
            calc.handleKey(Operator.addition);
            expect(calc.statement()).toEqual('8+');
        });
        test('should replace previous operator', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            expect(calc.statement()).toEqual('2*');
            calc.handleKey(Operator.addition);
            expect(calc.statement()).toEqual('2+');
        });
    });
    describe('Dot', () => {
        test('not add . if statement already has a dot', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('8');
            calc.handleKey('.');
            expect(calc.statement()).toEqual('8.');
            calc.handleKey('.');
            calc.handleKey('.');
            expect(calc.statement()).toEqual('8.');
        });
        test('should handle an evaluated statement', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.subtraction);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.statement()).toEqual('2-4=-2');
            calc.handleKey('.');
            expect(calc.statement()).toEqual('-2.');
        });
        test('should handle an empty statement', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('.');
            expect(calc.statement()).toEqual('0.');
        });
        test('should add a dot', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('3');
            calc.handleKey('.');
            expect(calc.statement()).toEqual('3.');
        });
    });
    describe('Number', () => {
        test('should handle an evaluated statement', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.subtraction);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.statement()).toEqual('2-4=-2');
            calc.handleKey('3');
            expect(calc.statement()).toEqual('3');
        });
        test('should handle first zero', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('0');
            expect(calc.statement()).toEqual('');
        });
        test('add number', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('0');
            expect(calc.statement()).toEqual('20');
        });
    });
    describe('Output', () => {
        test('returns default value if ws is empty', () => {
            const calc = createCalculator({updateCallBack});
            expect(calc.output()).toEqual('0');
        });
        test('returns custom default value if ws is partially cleared and a custom default value is passed', () => {
            const calc = createCalculator({updateCallBack, defaultZeroText: 'c__os_tum'});
            expect(calc.output()).toEqual('c__os_tum');
            calc.handleKey('4');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('2');
            calc.handleKey('2');
            expect(calc.statement()).toEqual('4*22');
            calc.handleKey('c');
            expect(calc.statement()).toEqual('4*');
            expect(calc.output()).toEqual('c__os_tum');
        });
        test('returns result when ws has been evaluated', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('5');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('5');
            calc.handleKey('=');
            expect(calc.output()).toEqual('25');
        });
        test('returns calculated output when ws ends with an operator', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('4');
            calc.handleKey(Operator.addition);
            expect(calc.output()).toEqual('24');
            calc.handleKey('3');
            calc.handleKey(Operator.multiplication);
            expect(calc.output()).toEqual('3');
            calc.handleKey('5');
            calc.handleKey(Operator.multiplication);
            expect(calc.output()).toEqual('15');
            calc.handleKey(Operator.subtraction);
            expect(calc.output()).toEqual('39');
        });
        test('returns working number when ws ends with a number', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('4');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            expect(calc.output()).toEqual('4');
        });
        test('returns working number when ws has no operator', () => {
            const calc = createCalculator({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('4');
            calc.handleKey('4');
            expect(calc.output()).toEqual('244');
        });
    });
});
