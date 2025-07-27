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
