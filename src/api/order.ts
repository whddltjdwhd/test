import axios from 'axios'

import clientApi from '../axios/client'
import {customError, type ErrorBase} from '../errorBase'

import type {OrderSheetResponse} from '../types/api/order/response'

export async function fetchOrderSheetData(): Promise<OrderSheetResponse> {
    try {
        const response = await clientApi.get<OrderSheetResponse>('/order/info')
        // 직렬화 가능한 데이터만 반환 (Axios response 객체가 아닌 실제 데이터만)
        return response.data
    } catch (error) {
        if (axios.isAxiosError<ErrorBase>(error) && error.response) {
            if (error.response.data) {
                throw error.response.data
            }
            throw customError.networkError
        }

        throw customError.unknownError
    }
}
