import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux'

import orderSheetReducer from './slices/server/orderSheetSlice'

import type {TypedUseSelectorHook} from 'react-redux'

export const store = configureStore({
    reducer: {
        orderSheet: orderSheetReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
