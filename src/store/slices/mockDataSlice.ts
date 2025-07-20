// src/store/slices/mockDataSlice.ts
import {createSlice} from '@reduxjs/toolkit'

import initialOrderSheetData from '../../mocks/data/orderSheetData.json'

// Mock 데이터를 Redux에서 직접 관리
interface MockDataState {
    orderSheetData: typeof initialOrderSheetData
}

const initialState: MockDataState = {
    orderSheetData: initialOrderSheetData,
}

const mockDataSlice = createSlice({
    name: 'mockData',
    initialState,
    reducers: {},
})

// Selectosrs - RootState 타입을 import하여 사용
export const selectMockOrderSheetData = (state: {mockData: MockDataState}) => state.mockData.orderSheetData

export default mockDataSlice.reducer
