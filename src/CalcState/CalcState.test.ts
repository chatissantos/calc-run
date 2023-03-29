import {describe, expect, test, vi} from "vitest";
import { Operator } from "./Operators";
import CalcState from "./index";

describe('CalcState', () => {
    const updateCallBack = vi.fn();
    describe('Clear', () => {
        test('should clear one character', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('1');
            calc.handleKey('c');
            expect(calc.get()).toEqual('');
        });
        test('should completely clear if ws has been evaluated', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('5');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('5');
            calc.handleKey('=');
            calc.handleKey('c');
            expect(calc.get()).toEqual('');
        });
        test('should partially clear working number then clear entire string', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('4');
            calc.handleKey('2');
            expect(calc.get()).toEqual('2*442');
            calc.handleKey('c');
            expect(calc.get()).toEqual('2*');
            calc.handleKey('c');
            expect(calc.get()).toEqual('');
        });
        test('should reset partially clear when a number is entered', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('2');
            expect(calc.get()).toEqual('2*42');
            calc.handleKey('c');
            expect(calc.get()).toEqual('2*');
            expect(calc.isPartiallyCleared()).toEqual(true);
            calc.handleKey('5');
            expect(calc.isPartiallyCleared()).toEqual(false);
        });
    });
    describe('Backspace', () => {
        test('should handle empty statement', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('bs');
            expect(calc.get()).toEqual('');
        })
        test('should handle number ending', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.division);
            calc.handleKey('7');
            calc.handleKey('bs');
            expect(calc.get()).toEqual('2/');
        })
        test('should handle operator ending', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.division);
            calc.handleKey('bs');
            expect(calc.get()).toEqual('2');
        })
        test('should an evaluated statement', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.get()).toEqual('2*4=8');
            calc.handleKey('bs');
            expect(calc.get()).toEqual('');
        })
    });
    describe('Operator', () => {
        test('should handle an evaluated statement', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.get()).toEqual('2*4=8');
            calc.handleKey(Operator.addition);
            expect(calc.get()).toEqual('8+');
        });
        test('should replace previous operator', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.multiplication);
            expect(calc.get()).toEqual('2*');
            calc.handleKey(Operator.addition);
            expect(calc.get()).toEqual('2+');
        });
    });
    describe('Dot', () => {
        test('not add . if statement already has a dot', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('8');
            calc.handleKey('.');
            expect(calc.get()).toEqual('8.');
            calc.handleKey('.');
            calc.handleKey('.');
            expect(calc.get()).toEqual('8.');
        });
        test('should handle an evaluated statement', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.subtraction);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.get()).toEqual('2-4=-2');
            calc.handleKey('.');
            expect(calc.get()).toEqual('-2.');
        });
        test('should handle an empty statement', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('.');
            expect(calc.get()).toEqual('0.');
        });
        test('should add a dot', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('3');
            calc.handleKey('.');
            expect(calc.get()).toEqual('3.');
        });
    });
    describe('Number', () => {
        test('should handle an evaluated statement', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey(Operator.subtraction);
            calc.handleKey('4');
            calc.handleKey('=');
            expect(calc.get()).toEqual('2-4=-2');
            calc.handleKey('3');
            expect(calc.get()).toEqual('3');
        });
        test('should handle first zero', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('0');
            expect(calc.get()).toEqual('');
        });
        test('add number', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('0');
            expect(calc.get()).toEqual('20');
        });
    });
    describe('Output', () => {
        test('returns default value if ws is empty', () => {
            const calc = CalcState({updateCallBack});
            expect(calc.getOutput()).toEqual('0');
        });
        test('returns custom default value if ws is partially cleared and a custom default value is passed', () => {
            const calc = CalcState({updateCallBack, defaultZeroText: 'c__os_tum'});
            expect(calc.getOutput()).toEqual('c__os_tum');
            calc.handleKey('4');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('2');
            calc.handleKey('2');
            expect(calc.get()).toEqual('4*22');
            calc.handleKey('c');
            expect(calc.get()).toEqual('4*');
            expect(calc.getOutput()).toEqual('c__os_tum');
        });
        test('returns result when ws has been evaluated', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('5');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('5');
            calc.handleKey('=');
            expect(calc.getOutput()).toEqual('25');
        });
        test('returns calculated output when ws ends with an operator', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('4');
            calc.handleKey(Operator.addition);
            expect(calc.getOutput()).toEqual('24');
            calc.handleKey('3');
            calc.handleKey(Operator.multiplication);
            expect(calc.getOutput()).toEqual('3');
            calc.handleKey('5');
            calc.handleKey(Operator.multiplication);
            expect(calc.getOutput()).toEqual('15');
            calc.handleKey(Operator.subtraction);
            expect(calc.getOutput()).toEqual('39');
        });
        test('returns working number when ws ends with a number', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('4');
            calc.handleKey(Operator.multiplication);
            calc.handleKey('4');
            expect(calc.getOutput()).toEqual('4');
        });
        test('returns working number when ws has no operator', () => {
            const calc = CalcState({updateCallBack});
            calc.handleKey('2');
            calc.handleKey('4');
            calc.handleKey('4');
            expect(calc.getOutput()).toEqual('244');
        });
    });
});
