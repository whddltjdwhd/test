import {configureStore} from '@reduxjs/toolkit'

import orderSheetCompleteReducer from './slices/orderSheetCompleteSlice'
import orderSheetReducer from './slices/orderSheetSlice'
import paymentMethodReducer from './slices/paymentMethodSlice'

export const store = configureStore({
    reducer: {
        orderSheet: orderSheetReducer, // 기존 개별 API 방식
        orderSheetComplete: orderSheetCompleteReducer, // 새로운 단일 API 방식
        paymentMethod: paymentMethodReducer, // 결제수단 관리
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
