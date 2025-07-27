import {errorTypeGuard} from '../types/guard/error'

import type {ErrorType} from '../errorBase'

export function checkErrorTypeInArr(err: (ErrorType | unknown)[]): ErrorType | null {
    for (const value of err) {
        if (errorTypeGuard(value)) {
            return value
        }
    }
    return null
}
