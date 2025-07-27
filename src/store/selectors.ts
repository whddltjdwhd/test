import {createSelector} from '@reduxjs/toolkit'

import type {RootState} from '.'

export const selectSubscriptionDate = (state: RootState) => state.orderSheet.data?.subscriptionDate
export const selectDeliveryAddress = (state: RootState) => state.orderSheet.data?.deliveryAddress
export const selectOrderProduct = (state: RootState) => state.orderSheet.data?.orderProduct
export const selectOrderPayMethod = (state: RootState) => state.orderSheet.data?.orderPayMethod
export const selectPointsReward = (state: RootState) => state.orderSheet.data?.pointsReward

export const selectOrderSheetState = (state: RootState) => state.orderSheet

export const selectOrderSheetData = createSelector(
    [selectSubscriptionDate, selectDeliveryAddress, selectOrderProduct, selectOrderPayMethod, selectPointsReward],
    (subscriptionDate, deliveryAddress, orderProduct, orderPayMethod, pointsReward) => {
        if (!subscriptionDate) {
            return null
        }

        return {
            subscriptionDate,
            deliveryAddress,
            orderProduct,
            orderPayMethod,
            pointsReward,
        }
    },
)

export const selectOrderSheetLoading = createSelector([selectOrderSheetState], (orderSheet) => orderSheet.loading)

export const selectOrderSheetError = createSelector([selectOrderSheetState], (orderSheet) => orderSheet.error)

// 슬라이스 전체 상태를 선택
export const selectStartSubscriptionState = (state: RootState) => state.startSubscription

// 각 상태 값을 개별적으로 선택
export const selectDeliveryMemo = (state: RootState) => state.startSubscription.deliveryMemo
export const selectUseAllCoupon = (state: RootState) => state.startSubscription.useAllCoupon
export const selectUseVirtualPhoneNumber = (state: RootState) => state.startSubscription.useVirtualPhoneNumber
export const selectReuseMemo = (state: RootState) => state.startSubscription.reuseMemo
