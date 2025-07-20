import {configureStore} from '@reduxjs/toolkit'

import mockDataReducer from './slices/mockDataSlice'
import orderSheetReducer from './slices/orderSheetSlice'

export const store = configureStore({
    reducer: {
        orderSheet: orderSheetReducer,
        mockData: mockDataReducer,
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
