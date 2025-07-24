import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {API_ENDPOINTS} from '../../constants/api'
import {apiClient} from '../../lib/axios'

import type {PaymentMethodResponse} from '../../types/api/response'
import type {PaymentType} from '../../types/domain/paymentMethod'
import type {AxiosError} from 'axios'

// 결제수단 정보 조회
export const fetchPaymentMethod = createAsyncThunk('paymentMethod/fetch', async (_, {rejectWithValue}) => {
    try {
        const response = await apiClient.get<{result: {response: PaymentMethodResponse}}>(
            API_ENDPOINTS.PAYMENT_METHOD.SUBSCRIPTION,
        )
        return response.data.result.response
    } catch (error) {
        const axiosError = error as AxiosError
        return rejectWithValue(axiosError.response?.data || axiosError.message)
    }
})

// 결제수단 변경 저장
export const updatePaymentMethod = createAsyncThunk(
    'paymentMethod/update',
    async (
        paymentInfo: {
            primaryPaymentType: PaymentType
            secondaryPaymentType: PaymentType
            selectedPrimaryCard?: string | null
            selectedSecondaryCard?: string | null
            usePointAll: boolean
        },
        {rejectWithValue},
    ) => {
        try {
            const response = await apiClient.post(API_ENDPOINTS.PAYMENT_METHOD.SUBSCRIPTION, paymentInfo)
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError
            return rejectWithValue(axiosError.response?.data || axiosError.message)
        }
    },
)

interface PaymentMethodState {
    data: PaymentMethodResponse | null
    loading: boolean
    error: string | null
    // UI 상태
    usePointAll: boolean
    primaryPaymentType: PaymentType
    secondaryPaymentType: PaymentType
    selectedPrimaryCard: string | null
    selectedSecondaryCard: string | null
    cashReceiptType: 'PHONE' | 'BUSINESS'
    cashReceiptNumber: string
}

const initialState: PaymentMethodState = {
    data: null,
    loading: false,
    error: null,
    usePointAll: false,
    primaryPaymentType: 'CARD',
    secondaryPaymentType: 'NONE',
    selectedPrimaryCard: null,
    selectedSecondaryCard: null,
    cashReceiptType: 'PHONE',
    cashReceiptNumber: '',
}

const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,
    reducers: {
        setUsePointAll: (state, action) => {
            state.usePointAll = action.payload
        },
        setPrimaryPaymentType: (state, action) => {
            state.primaryPaymentType = action.payload
            // 1순위 페이머니 선택 시 2순위는 자동으로 카드
            if (action.payload === 'PAYMONEY') {
                state.secondaryPaymentType = 'CARD'
                state.selectedSecondaryCard = null
            }
            // 1순위 카드 선택 시 2순위 옵션 초기화
            else if (action.payload === 'CARD') {
                if (state.secondaryPaymentType === 'CARD') {
                    state.selectedSecondaryCard = null
                }
            }
        },
        setSecondaryPaymentType: (state, action) => {
            state.secondaryPaymentType = action.payload
            if (action.payload === 'CARD') {
                state.selectedSecondaryCard = null
            }
        },
        setSelectedPrimaryCard: (state, action) => {
            state.selectedPrimaryCard = action.payload
            // 1순위와 같은 카드 선택 시 2순위 초기화
            if (state.selectedSecondaryCard === action.payload) {
                state.selectedSecondaryCard = null
            }
        },
        setSelectedSecondaryCard: (state, action) => {
            state.selectedSecondaryCard = action.payload
        },
        setCashReceiptType: (state, action) => {
            state.cashReceiptType = action.payload
            state.cashReceiptNumber = ''
        },
        setCashReceiptNumber: (state, action) => {
            state.cashReceiptNumber = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethod.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPaymentMethod.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                // 기본값 설정
                state.usePointAll = action.payload.prevPaymentMethodInfo.usePointAll
                if (action.payload.cardResult.result.cardList.length > 0) {
                    state.selectedPrimaryCard = action.payload.cardResult.result.cardList[0].cid
                }
            })
            .addCase(fetchPaymentMethod.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(updatePaymentMethod.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePaymentMethod.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updatePaymentMethod.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const {
    setUsePointAll,
    setPrimaryPaymentType,
    setSecondaryPaymentType,
    setSelectedPrimaryCard,
    setSelectedSecondaryCard,
    setCashReceiptType,
    setCashReceiptNumber,
} = paymentMethodSlice.actions

export default paymentMethodSlice.reducer
