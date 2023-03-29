import {isOperator} from "./Operators";

export default function containsOperator(chars: string) {
    return !!Array.from(chars).find((item) => isOperator(item));
}