import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {API_ENDPOINTS} from '../../constants/api'
import {apiClient} from '../../lib/axios'

import type {
    DeliveryAddress,
    OrderPayMethod,
    OrderProduct,
    OrderSheetState,
    PointsReward,
    SubscriptionDate,
} from '../../types/order'
import type {AxiosError} from 'axios'

// 구독 날짜 정보 조회 thunk
export const fetchSubscriptionDate = createAsyncThunk(
    'orderSheet/fetchSubscriptionDate',
    async (_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get<SubscriptionDate>(API_ENDPOINTS.ORDER_SHEET.SUBSCRIPTION_DATE)
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError
            return rejectWithValue(axiosError.response?.data || axiosError.message)
        }
    },
)

// 배송 주소 정보 조회 thunk
export const fetchDeliveryAddress = createAsyncThunk(
    'orderSheet/fetchDeliveryAddress',
    async (_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get<DeliveryAddress>(API_ENDPOINTS.ORDER_SHEET.DELIVERY_ADDRESS)
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError
            return rejectWithValue(axiosError.response?.data || axiosError.message)
        }
    },
)

// 주문 상품 정보 조회 thunk
export const fetchOrderProduct = createAsyncThunk('orderSheet/fetchOrderProduct', async (_, {rejectWithValue}) => {
    try {
        const response = await apiClient.get<OrderProduct>(API_ENDPOINTS.ORDER_SHEET.ORDER_PRODUCT)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError
        return rejectWithValue(axiosError.response?.data || axiosError.message)
    }
})

// 결제 방법 정보 조회 thunk
export const fetchOrderPayMethod = createAsyncThunk('orderSheet/fetchOrderPayMethod', async (_, {rejectWithValue}) => {
    try {
        const response = await apiClient.get<OrderPayMethod>(API_ENDPOINTS.ORDER_SHEET.ORDER_PAY_METHOD)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError
        return rejectWithValue(axiosError.response?.data || axiosError.message)
    }
})

// 포인트 리워드 정보 조회 thunk
export const fetchPointsReward = createAsyncThunk('orderSheet/fetchPointsReward', async (_, {rejectWithValue}) => {
    try {
        const response = await apiClient.get<PointsReward>(API_ENDPOINTS.ORDER_SHEET.POINTS_REWARD)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError
        return rejectWithValue(axiosError.response?.data || axiosError.message)
    }
})

// 배송 메모 옵션 조회 thunk
export const fetchDeliveryMemoOptions = createAsyncThunk(
    'orderSheet/fetchDeliveryMemoOptions',
    async (_, {rejectWithValue}) => {
        try {
            // 실제로는 API 호출이지만, 현재는 dbWithRedux를 사용
            const {dbWithRedux} = await import('../../mocks/dbWithRedux')
            const options = dbWithRedux.getDeliveryMemoOptions()
            return options
        } catch (error) {
            const axiosError = error as AxiosError
            return rejectWithValue(axiosError.response?.data || axiosError.message)
        }
    },
)

const initialState: OrderSheetState = {
    subscriptionDate: null,
    deliveryAddress: null,
    orderProduct: null,
    orderPayMethod: null,
    pointsReward: null,
    deliveryMemoOptions: [],
    loading: {
        subscriptionDate: false,
        deliveryAddress: false,
        orderProduct: false,
        orderPayMethod: false,
        pointsReward: false,
        deliveryMemoOptions: false,
    },
    error: {
        subscriptionDate: null,
        deliveryAddress: null,
        orderProduct: null,
        orderPayMethod: null,
        pointsReward: null,
        deliveryMemoOptions: null,
    },
}

const orderSheetSlice = createSlice({
    name: 'orderSheet',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = {
                subscriptionDate: null,
                deliveryAddress: null,
                orderProduct: null,
                orderPayMethod: null,
                pointsReward: null,
                deliveryMemoOptions: null,
            }
        },
        resetOrderSheet: () => initialState,
    },
    extraReducers: (builder) => {
        // 구독 날짜 정보 조회
        builder
            .addCase(fetchSubscriptionDate.pending, (state) => {
                state.loading.subscriptionDate = true
                state.error.subscriptionDate = null
            })
            .addCase(fetchSubscriptionDate.fulfilled, (state, action) => {
                state.loading.subscriptionDate = false
                state.subscriptionDate = action.payload
            })
            .addCase(fetchSubscriptionDate.rejected, (state, action) => {
                state.loading.subscriptionDate = false
                state.error.subscriptionDate = action.payload as string
            })

        // 배송 주소 정보 조회
        builder
            .addCase(fetchDeliveryAddress.pending, (state) => {
                state.loading.deliveryAddress = true
                state.error.deliveryAddress = null
            })
            .addCase(fetchDeliveryAddress.fulfilled, (state, action) => {
                state.loading.deliveryAddress = false
                state.deliveryAddress = action.payload
            })
            .addCase(fetchDeliveryAddress.rejected, (state, action) => {
                state.loading.deliveryAddress = false
                state.error.deliveryAddress = action.payload as string
            })

        // 주문 상품 정보 조회
        builder
            .addCase(fetchOrderProduct.pending, (state) => {
                state.loading.orderProduct = true
                state.error.orderProduct = null
            })
            .addCase(fetchOrderProduct.fulfilled, (state, action) => {
                state.loading.orderProduct = false
                state.orderProduct = action.payload
            })
            .addCase(fetchOrderProduct.rejected, (state, action) => {
                state.loading.orderProduct = false
                state.error.orderProduct = action.payload as string
            })

        // 결제 방법 정보 조회
        builder
            .addCase(fetchOrderPayMethod.pending, (state) => {
                state.loading.orderPayMethod = true
                state.error.orderPayMethod = null
            })
            .addCase(fetchOrderPayMethod.fulfilled, (state, action) => {
                state.loading.orderPayMethod = false
                state.orderPayMethod = action.payload
            })
            .addCase(fetchOrderPayMethod.rejected, (state, action) => {
                state.loading.orderPayMethod = false
                state.error.orderPayMethod = action.payload as string
            })

        // 포인트 리워드 정보 조회
        builder
            .addCase(fetchPointsReward.pending, (state) => {
                state.loading.pointsReward = true
                state.error.pointsReward = null
            })
            .addCase(fetchPointsReward.fulfilled, (state, action) => {
                state.loading.pointsReward = false
                state.pointsReward = action.payload
            })
            .addCase(fetchPointsReward.rejected, (state, action) => {
                state.loading.pointsReward = false
                state.error.pointsReward = action.payload as string
            })

        // 배송 메모 옵션 조회
        builder
            .addCase(fetchDeliveryMemoOptions.pending, (state) => {
                state.loading.deliveryMemoOptions = true
                state.error.deliveryMemoOptions = null
            })
            .addCase(fetchDeliveryMemoOptions.fulfilled, (state, action) => {
                state.loading.deliveryMemoOptions = false
                state.deliveryMemoOptions = action.payload
            })
            .addCase(fetchDeliveryMemoOptions.rejected, (state, action) => {
                state.loading.deliveryMemoOptions = false
                state.error.deliveryMemoOptions = action.payload as string
            })
    },
})

export const {clearErrors, resetOrderSheet} = orderSheetSlice.actions
export default orderSheetSlice.reducer
