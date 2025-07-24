import type {ErrorType} from '../../errorBase'

export function errorTypeGuard(value: ErrorType): value is ErrorType {
    return (
        value === 'typeError' ||
        value === 'syntaxError' ||
        value === 'referenceError' ||
        value === 'rangeError' ||
        value === 'uriError' ||
        value === 'evalError' ||
        value === 'unknownError'
    )
}

export function errorCodeGuard(value: string): value is '00' | '01' | '02' | '03' | '04' | '05' | '06' {
    return (
        value === '00' ||
        value === '01' ||
        value === '02' ||
        value === '03' ||
        value === '04' ||
        value === '05' ||
        value === '06'
    )
}
