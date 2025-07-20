import {store} from '../store'
import {selectMockOrderSheetData, updateMockDeliveryAddress} from '../store/slices/mockDataSlice'

import type {
    DeliveryAddress,
    DeliveryMemoOption,
    OrderPayMethod,
    OrderProduct,
    Period,
    PointsReward,
    SubscriptionDate,
} from '../types/domain/order'

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

    // 배송 메모 옵션 목록 조회 (기본 메시지 + API 데이터 + 추가 옵션)
    getDeliveryMemoOptions: (): DeliveryMemoOption[] => {
        const orderSheetData = selectMockOrderSheetData(store.getState())
        const memos = orderSheetData.result.subscriptionViewResult.deliveryAddressBook.recentUsedDeliveryMemosReuse

        const options: DeliveryMemoOption[] = [
            // 기본 선택 메시지
            {
                id: 'default',
                label: '배송 메모를 선택해주세요',
                value: '',
                type: 'default',
            },
            // 선택 안함 옵션
            {
                id: 'none',
                label: '선택 안함',
                value: '',
                type: 'none',
            },
            // API에서 받아온 배송 메모들
            ...memos.map((memo, index) => ({
                id: `memo-${index}`,
                label: memo.memo,
                value: memo.memo,
                type: 'template' as const,
            })),
            // 직접 입력하기 옵션
            {
                id: 'custom',
                label: '직접 입력하기',
                value: '',
                type: 'custom',
            },
        ]

        return options
    },

    // 현재 선택된 배송 메모 조회 (사용하지 않음 - 클라이언트 상태로 관리)
    // getSelectedDeliveryMemo: (): DeliveryMemo => {
    //     const orderSheetData = selectMockOrderSheetData(store.getState())
    //     const memos = orderSheetData.result.subscriptionViewResult.deliveryAddressBook.recentUsedDeliveryMemosReuse
    //     const firstMemo = memos[0] || {memo: '', memoSeq: 0, reuseMemo: false, template: false}

    //     return {
    //         memo: firstMemo.memo,
    //         memoSeq: firstMemo.memoSeq,
    //         reuseMemo: firstMemo.reuseMemo,
    //         template: firstMemo.template,
    //     }
    // },

    // 배송 메모 업데이트 (사용하지 않음 - 클라이언트 상태로 관리)
    // updateDeliveryMemo: (memo: string, type: 'template' | 'custom' | 'none' = 'custom'): DeliveryMemo => {
    //     const newMemo: DeliveryMemo = {
    //         memo,
    //         memoSeq: type === 'template' ? 1 : 0,
    //         reuseMemo: type === 'template',
    //         template: type === 'template',
    //     }

    //     // 배송 주소와 함께 메모도 업데이트
    //     const currentAddress = dbWithRedux.getDeliveryAddress()
    //     store.dispatch(
    //         updateMockDeliveryAddress({
    //             ...currentAddress,
    //             memo: newMemo,
    //         }),
    //     )

    //     return newMemo
    // },

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
