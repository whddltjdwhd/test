// 서버 데이터베이스 모킹 - Redux와 완전히 분리
import orderSheetData from './data/orderSheetData.json'

import type {
    DeliveryAddress,
    DeliveryMemoOption,
    OrderPayMethod,
    OrderProduct,
    Period,
    PointsReward,
    SubscriptionDate,
} from '../types/domain/order'

// 순수한 서버 DB 모킹 - Redux 의존성 제거
export const mockDB = {
    // 구독 날짜 정보 조회
    getSubscriptionDate: (): SubscriptionDate => {
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
        const product = orderSheetData.result.subscriptionViewResult.products[0]
        const item = product.items[0]

        return {
            merchantChannelName: product.merchantChannelName || '네이버페이',
            deliveryPolicy: {
                deliveryMethodType: 'DELIVERY',
                deliveryFeeClassType: 'FREE',
            },
            productName: product.productName,
            quantity: item.quantity,
            discountedAmount: 0, // JSON에서 할인 정보가 별도로 관리됨
            orderAmount: item.orderAmount,
            totalAmount: item.orderAmount,
        }
    },

    // 결제 방법 정보 조회
    getOrderPayMethod: (): OrderPayMethod => {
        return {
            usePointAll: false,
            payMethodNames: ['신용카드', '계좌이체'],
            cashReceiptApply: false,
            cashReceiptInfo: '',
        }
    },

    // 포인트 리워드 정보 조회
    getPointsReward: (): PointsReward => {
        return {
            maxReward: 1000,
            purchaseReward: 100,
            adminReward: 50,
            sellerReward: 30,
            reviewReward: 20,
        }
    },

    // 배송 메모 옵션 조회
    getDeliveryMemoOptions: (): DeliveryMemoOption[] => {
        return [
            {id: 'default', label: '선택해주세요', value: '', type: 'default'},
            {id: 'none', label: '배송메모 없음', value: '', type: 'none'},
            {id: 'custom', label: '직접 입력하기', value: '', type: 'custom'},
            {id: 'memo-1', label: '문 앞에 놓아주세요', value: '문 앞에 놓아주세요', type: 'template'},
            {id: 'memo-2', label: '경비실에 맡겨주세요', value: '경비실에 맡겨주세요', type: 'template'},
            {id: 'memo-3', label: '배송 전 연락주세요', value: '배송 전 연락주세요', type: 'template'},
        ]
    },

    // 전체 주문서 데이터 조회 (필요시)
    getFullOrderSheetData: () => {
        return orderSheetData
    },
}

// API 지연 시뮬레이션
export const simulateDelay = (ms = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
