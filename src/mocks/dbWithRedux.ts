import {store} from '../store'
import {selectMockOrderSheetData, updateMockDeliveryAddress} from '../store/slices/mockDataSlice'

import type {
    DeliveryAddress,
    OrderPayMethod,
    OrderProduct,
    Period,
    PointsReward,
    SubscriptionDate,
} from '../types/order'

// Redux store에서 데이터를 가져오는 함수들
export const dbWithRedux = {
    // 구독 날짜 정보 조회
    getSubscriptionDate: (): SubscriptionDate => {
        const orderSheetData = selectMockOrderSheetData(store.getState())
        const subscription = orderSheetData.result.subscriptionViewResult.subscription
        return {
            firstDeliveryDate: subscription.firstDeliveryDate,
            firstPaymentDate: subscription.firstPaymentDate,
            periodType: subscription.periodType as Period,
            periodCount: subscription.periodCount,
        }
    },

    // 배송 주소 정보 조회
    getDeliveryAddress: (): DeliveryAddress => {
        const orderSheetData = selectMockOrderSheetData(store.getState())
        const address = orderSheetData.result.subscriptionViewResult.deliveryAddressBook.defaultDeliveryAddress
        const memos = orderSheetData.result.subscriptionViewResult.deliveryAddressBook.recentUsedDeliveryMemosReuse
        const firstMemo = memos[0] || {memo: '', memoSeq: 0, reuseMemo: false, template: false}

        return {
            ...address,
            address: `${address.baseAddress} ${address.detailAddress}`,
            memo: {
                memo: firstMemo.memo,
                memoSeq: firstMemo.memoSeq,
                reuseMemo: firstMemo.reuseMemo,
                template: firstMemo.template,
            },
        }
    },

    // 주문 상품 정보 조회
    getOrderProduct: (): OrderProduct => {
        const orderSheetData = selectMockOrderSheetData(store.getState())
        const product = orderSheetData.result.subscriptionViewResult.products[0]
        const item = product.items[0]
        const deliveryGroups = orderSheetData.result.subscriptionViewResult.delivery.deliveryGroupsByKey
        const deliveryPolicy = deliveryGroups[product.deliveryGroupKey as keyof typeof deliveryGroups].deliveryPolicy

        const discountedAmount = product.salePrice - item.orderAmount

        return {
            merchantChannelName: product.merchantChannelName,
            deliveryPolicy: {
                deliveryMethodType: deliveryPolicy.deliveryMethodType as 'DELIVERY' | 'PICKUP',
                deliveryFeeClassType: deliveryPolicy.deliveryFeeClassType as 'FREE' | 'PAID',
            },
            productName: product.productName,
            quantity: item.quantity,
            discountedAmount,
            orderAmount: item.orderAmount,
            totalAmount: item.orderAmount,
        }
    },

    // 결제 방법 정보 조회
    getOrderPayMethod: (): OrderPayMethod => {
        const orderSheetData = selectMockOrderSheetData(store.getState())
        const paymentMethods = orderSheetData.result.paymentMethodsResult
        const payMethodNames = [
            paymentMethods.firstPayMethod.payMethodName,
            paymentMethods.secondPayMethod.payMethodName,
        ]

        return {
            usePointAll: paymentMethods.usePointAll,
            payMethodNames,
            cashReceiptApply: paymentMethods.cashReceiptApply,
            cashReceiptInfo: paymentMethods.cashReceipt.issueNumber,
        }
    },

    // 포인트 리워드 정보 조회
    getPointsReward: (): PointsReward => {
        const orderSheetData = selectMockOrderSheetData(store.getState())
        const product = orderSheetData.result.subscriptionViewResult.products[0]
        const orderAmount = product.items[0].orderAmount

        const purchaseReward = Math.floor(orderAmount * 0.01)
        const sellerReward = Math.floor(purchaseReward * 0.5)

        return {
            maxReward: 20000,
            purchaseReward,
            adminReward: 0,
            sellerReward,
            reviewReward: 100,
        }
    },

    // 배송 주소 업데이트 (Redux action dispatch)
    updateDeliveryAddress: (updates: Partial<DeliveryAddress>): DeliveryAddress => {
        // Redux store 업데이트
        store.dispatch(updateMockDeliveryAddress(updates))

        // 업데이트된 데이터 반환
        return dbWithRedux.getDeliveryAddress()
    },
}
