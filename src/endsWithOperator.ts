import {isOperator} from "./Operators";
import lastChar from "./lastChar";

export default function endsWithOperator(chars: string) {
    return isOperator(lastChar(chars));
}