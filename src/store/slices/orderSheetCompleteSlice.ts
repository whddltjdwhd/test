import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {API_ENDPOINTS} from '../../constants/api'
import {apiClient} from '../../lib/axios'

import type {OrderSheetCompleteResponse, OrderSheetState} from '../../types/ui/orderSheetComplete'
import type {AxiosError} from 'axios'

// 단일 API 호출로 모든 주문서 데이터 조회
export const fetchOrderSheetComplete = createAsyncThunk(
    'orderSheetComplete/fetchComplete',
    async (_, {rejectWithValue}) => {
        const startTime = performance.now()
        try {
            const response = await apiClient.get<OrderSheetCompleteResponse>(API_ENDPOINTS.ORDER_SHEET.COMPLETE)
            const endTime = performance.now()
            // eslint-disable-next-line no-console
            console.log(`🚀 Single API 호출 시간: ${(endTime - startTime).toFixed(2)}ms`)
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError
            return rejectWithValue(axiosError.response?.data || axiosError.message)
        }
    },
)

const initialState: OrderSheetState = {
    data: null,
    loading: false,
    error: null,
}

const orderSheetCompleteSlice = createSlice({
    name: 'orderSheetComplete',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        resetOrderSheet: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderSheetComplete.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrderSheetComplete.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchOrderSheetComplete.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const {clearError, resetOrderSheet} = orderSheetCompleteSlice.actions
export default orderSheetCompleteSlice.reducer
