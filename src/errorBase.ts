export type ErrorType =
    | 'typeError'
    | 'syntaxError'
    | 'referenceError'
    | 'networkError'
    | 'uriError'
    | 'evalError'
    | 'unknownError'
export type ErrorCode = '00' | '01' | '02' | '03' | '04' | '05' | '06'
export interface ErrorBase {
    code: ErrorCode
    message: string
}

export const customError: Record<ErrorType, ErrorBase> = {
    typeError: {
        code: '00',
        message: 'Type Error: 잘못된 타입이 사용되었습니다.',
    },
    syntaxError: {
        code: '01',
        message: 'Syntax Error: 문법 오류가 발생했습니다.',
    },
    referenceError: {
        code: '02',
        message: 'Reference Error: 참조 오류가 발생했습니다.',
    },
    networkError: {
        code: '03',
        message: 'Network Error: 네트워크 오류가 발생했습니다.',
    },
    uriError: {
        code: '04',
        message: 'URI Error: URI 오류가 발생했습니다.',
    },
    evalError: {
        code: '05',
        message: 'Eval Error: Eval 오류가 발생했습니다.',
    },
    unknownError: {
        code: '06',
        message: 'Unknown Error: 알 수 없는 오류가 발생했습니다.',
    },
}
