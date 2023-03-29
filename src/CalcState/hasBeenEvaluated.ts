export default function hasBeenEvaluated(workingStatement: string): boolean {
    const i = workingStatement.indexOf('=')
    return i > -1 && i !== workingStatement.length - 1;
}

