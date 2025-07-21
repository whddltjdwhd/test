import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {API_ENDPOINTS} from '../../constants/api'
import {apiClient} from '../../lib/axios'
import {DEFAULT_ORDER_SHEET_PARAMS} from '../../types/api/params'

import type {OrderSheetParams} from '../../types/api/params'
import type {OrderSheetCompleteResponse} from '../../types/api/response'
import type {OrderSheetCompleteState} from '../../types/store/orderSheetComplete'
import type {AxiosError} from 'axios'

// 단일 API 호출로 모든 주문서 데이터 조회
export const fetchOrderSheetComplete = createAsyncThunk(
    'orderSheetComplete/fetchComplete',
    async (params: OrderSheetParams = DEFAULT_ORDER_SHEET_PARAMS, {rejectWithValue}) => {
        const startTime = performance.now()
        try {
            // 쿼리 파라미터로 전달
            const queryParams = new URLSearchParams({
                orderSheetId: params.orderSheetId,
                deviceType: params.deviceType,
                osType: params.osType,
                isMobileDisplay: params.isMobileDisplay.toString(),
                ...(params.backUrl && {backUrl: params.backUrl}),
            })

            const response = await apiClient.get<OrderSheetCompleteResponse>(
                `${API_ENDPOINTS.ORDER_SHEET.COMPLETE}?${queryParams.toString()}`,
            )
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

const initialState: OrderSheetCompleteState = {
    data: null,
    loading: false,
    error: null,
}

const orderSheetCompleteSlice = createSlice({
    name: 'orderSheetComplete',
    initialState,
    reducers: {
        // reducers는 필수 속성이므로 빈 객체로 유지
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

// reducer에서 actions가 없으므로 별도의 export 없음
export default orderSheetCompleteSlice.reducer
