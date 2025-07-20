// src/store/slices/mockDataSlice.ts
import {createSlice} from '@reduxjs/toolkit'

import initialOrderSheetData from '../../mocks/data/orderSheetData.json'

import type {DeliveryAddress} from '../../types/domain/order'
import type {PayloadAction} from '@reduxjs/toolkit'

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
    reducers: {
        // 배송 주소 업데이트
        updateMockDeliveryAddress: (state, action: PayloadAction<Partial<DeliveryAddress>>) => {
            const address =
                state.orderSheetData.result.subscriptionViewResult.deliveryAddressBook.defaultDeliveryAddress
            const memos =
                state.orderSheetData.result.subscriptionViewResult.deliveryAddressBook.recentUsedDeliveryMemosReuse

            if (action.payload.receiverName) {
                address.receiverName = action.payload.receiverName
            }
            if (action.payload.addressName) {
                address.addressName = action.payload.addressName
            }
            if (action.payload.telNo1) {
                address.telNo1 = action.payload.telNo1
            }
            if (action.payload.telNo2) {
                address.telNo2 = action.payload.telNo2
            }
            if (action.payload.address) {
                // 주소 파싱 로직
                const addressParts = action.payload.address.split(' ')
                const detailIndex = addressParts.findIndex((part) => part.includes('동') || part.includes('호'))
                if (detailIndex > 0) {
                    address.baseAddress = addressParts.slice(0, detailIndex).join(' ')
                    address.detailAddress = addressParts.slice(detailIndex).join(' ')
                } else {
                    address.baseAddress = action.payload.address
                }
            }
            if (action.payload.memo) {
                // 첫 번째 메모 업데이트
                if (memos.length > 0) {
                    memos[0] = {
                        memo: action.payload.memo.memo,
                        memoSeq: action.payload.memo.memoSeq,
                        reuseMemo: action.payload.memo.reuseMemo,
                        template: action.payload.memo.template,
                    }
                } else {
                    // 메모 배열이 비어있으면 새로 추가
                    memos.push({
                        memo: action.payload.memo.memo,
                        memoSeq: action.payload.memo.memoSeq,
                        reuseMemo: action.payload.memo.reuseMemo,
                        template: action.payload.memo.template,
                    })
                }
            }
        },

        // 다른 데이터 업데이트 액션들...
        resetMockData: (state) => {
            state.orderSheetData = initialOrderSheetData
        },
    },
})

export const {updateMockDeliveryAddress, resetMockData} = mockDataSlice.actions

// Selectors - RootState 타입을 import하여 사용
export const selectMockOrderSheetData = (state: {mockData: MockDataState}) => state.mockData.orderSheetData

export default mockDataSlice.reducer
