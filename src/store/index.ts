import {configureStore} from '@reduxjs/toolkit'

import orderSheetCompleteReducer from './slices/orderSheetCompleteSlice'
import orderSheetReducer from './slices/orderSheetSlice'

export const store = configureStore({
    reducer: {
        orderSheet: orderSheetReducer, // 기존 개별 API 방식
        orderSheetComplete: orderSheetCompleteReducer, // 새로운 단일 API 방식
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
