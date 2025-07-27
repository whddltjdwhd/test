import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

import type {DeliveryMemo} from '../../../types/domain/delivery'

interface StartSubscriptionState {
    /**
     * deliveryMemo: DeliveryMemo
     * useAllCoupon: boolean
     * useVirtualPhoneNumber: boolean
     * reuseMemo: boolean
     */
    deliveryMemo: DeliveryMemo
    useAllCoupon: boolean
    useVirtualPhoneNumber: boolean
    reuseMemo: boolean
}

const initialState: StartSubscriptionState = {
    deliveryMemo: {
        memo: '',
        memoSeq: 0,
        reuseMemo: false,
        template: false,
    },
    useAllCoupon: false,
    useVirtualPhoneNumber: false,
    reuseMemo: false,
}

export const startSubscriptionSlice = createSlice({
    name: 'startSubscription',
    initialState,
    reducers: {
        setDeliveryMemo(state, action: PayloadAction<DeliveryMemo>) {
            state.deliveryMemo = action.payload
        },
        setUseAllCoupon(state, action: PayloadAction<boolean>) {
            state.useAllCoupon = action.payload
        },
        setUseVirtualPhoneNumber(state, action: PayloadAction<boolean>) {
            state.useVirtualPhoneNumber = action.payload
        },
        setReuseMemo(state, action: PayloadAction<boolean>) {
            state.reuseMemo = action.payload
        },
    },
})

export const {setDeliveryMemo, setUseAllCoupon, setUseVirtualPhoneNumber, setReuseMemo} = startSubscriptionSlice.actions

export default startSubscriptionSlice.reducer
