import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {fetchOrderSheetData} from '../../../api/order'

import type {OrderSheetResponse} from '../../../types/api/order/response'

const fetchOrderSheet = createAsyncThunk('orderSheet/fetch', async (_, {rejectWithValue}) => {
    try {
        return await fetchOrderSheetData()
    } catch (error) {
        return rejectWithValue(error)
    }
})

interface OrderSheetState {
    data: OrderSheetResponse | null
    loading: boolean
    error: string | null
}

const initialState: OrderSheetState = {
    data: null,
    loading: false,
    error: null,
}

const orderSheetSlice = createSlice({
    name: 'orderSheet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderSheet.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrderSheet.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchOrderSheet.rejected, (state, action) => {
                state.loading = false
                state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch order sheet'
            })
    },
})

export default orderSheetSlice.reducer
export {fetchOrderSheet}
