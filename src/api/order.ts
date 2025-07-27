import axios from 'axios'

import clientApi from '../axios/client'
import {customError, type ErrorBase} from '../errorBase'

import type {OrderSheetResponse} from '../types/api/order/response'

export async function fetchOrderSheetData() {
    try {
        const response = await clientApi.get<OrderSheetResponse>('/order-sheet')
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
