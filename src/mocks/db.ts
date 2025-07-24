// 서버 데이터베이스 모킹 - Redux와 완전히 분리
import originalData from './data/orderSheetData.json'

import type {OrderSheetParams} from '../types/api/params'
import type {DeliveryAddress, DeliveryMemoOption} from '../types/domain/delivery'
import type {OrderPayMethod, PointsReward} from '../types/domain/payment'
import type {OrderProduct} from '../types/domain/product'
import type {Period, SubscriptionDate} from '../types/domain/subscription'

// 동적으로 설정되는 주문서 데이터
// localStorage에서 orderSheetData 불러오기
const getStoredOrderSheetData = () => {
    try {
        const stored = localStorage.getItem('orderSheetData')
        if (stored) {
            const storedData = JSON.parse(stored)
            // eslint-disable-next-line no-console
            console.log('📦 localStorage에서 데이터 로드됨')
            return storedData
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('localStorage 읽기 실패:', error)
    }
    return null
}

let orderSheetData = getStoredOrderSheetData()

const saveOrderSheetData = (data: typeof originalData) => {
    try {
        localStorage.setItem('orderSheetData', JSON.stringify(data))
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('localStorage 저장 실패:', error)
    }
}

// 순수한 서버 DB 모킹 - Redux 의존성 제거
export const mockDB = {
    // 실제 orderSheetData 초기화
    initializeOrderSheet: (params: OrderSheetParams) => {
        // eslint-disable-next-line no-console
        console.log(`📋 주문서 초기화 - ID: ${params.orderSheetId}, Device: ${params.deviceType}`)

        // 실제 orderSheetData를 파라미터 값으로 업데이트
        orderSheetData = {
            ...originalData,
            result: {
                ...originalData.result,
                subscriptionViewResult: {
                    ...originalData.result.subscriptionViewResult,
                    orderSheetId: params.orderSheetId, // 동적으로 설정
                    backUrl: params.backUrl || originalData.result.subscriptionViewResult.backUrl,
                },
            },
        }

        // localStorage에 저장
        saveOrderSheetData(orderSheetData)

        return orderSheetData
    },

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

        return {
            ...address,
            address: `${address.baseAddress} ${address.detailAddress}`,
            memos,
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
        const firstPayment =
            orderSheetData.result.paymentMethodsResult.firstPayMethod.payMethodName +
            orderSheetData.result.paymentMethodsResult.firstPayMethod.payMethodDisplayNumber
        const secondPayment =
            orderSheetData.result.paymentMethodsResult.secondPayMethod.payMethodName +
            orderSheetData.result.paymentMethodsResult.secondPayMethod.payMethodDisplayNumber
        return {
            usePointAll: false,
            payMethodNames: [firstPayment, secondPayment],
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

    // 결제 수단 정보 업데이트
    updatePaymentMethod: (paymentInfo: {
        primaryPaymentType: string
        secondaryPaymentType: string
        selectedPrimaryCard?: string | null
        selectedSecondaryCard?: string | null
        usePointAll: boolean
    }) => {
        // 결제 수단 정보를 orderSheetData에 반영
        const {primaryPaymentType, secondaryPaymentType, selectedPrimaryCard, selectedSecondaryCard, usePointAll} =
            paymentInfo

        // 1순위 결제수단 설정
        let firstPayMethodName = ''
        let firstPayMethodDisplayNumber = ''

        if (primaryPaymentType === 'CARD' && selectedPrimaryCard) {
            firstPayMethodName = '카드'
            firstPayMethodDisplayNumber = ` (${selectedPrimaryCard.slice(-4)})`
        } else if (primaryPaymentType === 'PAYMONEY') {
            firstPayMethodName = '페이머니'
            firstPayMethodDisplayNumber = ''
        }

        // 2순위 결제수단 설정
        let secondPayMethodName = ''
        let secondPayMethodDisplayNumber = ''

        if (secondaryPaymentType === 'CARD' && selectedSecondaryCard) {
            secondPayMethodName = '카드'
            secondPayMethodDisplayNumber = ` (${selectedSecondaryCard.slice(-4)})`
        } else if (secondaryPaymentType === 'PAYMONEY') {
            secondPayMethodName = '페이머니'
            secondPayMethodDisplayNumber = ''
        } else {
            secondPayMethodName = '선택안함'
            secondPayMethodDisplayNumber = ''
        }

        // orderSheetData 업데이트
        orderSheetData = {
            ...orderSheetData,
            result: {
                ...orderSheetData.result,
                paymentMethodsResult: {
                    ...orderSheetData.result.paymentMethodsResult,
                    firstPayMethod: {
                        ...orderSheetData.result.paymentMethodsResult.firstPayMethod,
                        payMethodName: firstPayMethodName,
                        payMethodDisplayNumber: firstPayMethodDisplayNumber,
                    },
                    secondPayMethod: {
                        ...orderSheetData.result.paymentMethodsResult.secondPayMethod,
                        payMethodName: secondPayMethodName,
                        payMethodDisplayNumber: secondPayMethodDisplayNumber,
                    },
                    usePointAll,
                },
            },
        }

        // eslint-disable-next-line no-console
        console.log('💳 결제수단 업데이트됨:', {
            first: firstPayMethodName + firstPayMethodDisplayNumber,
            second: secondPayMethodName + secondPayMethodDisplayNumber,
            usePointAll,
        })

        // localStorage에 저장
        saveOrderSheetData(orderSheetData)

        return orderSheetData
    },
}

// API 지연 시뮬레이션
export const simulateDelay = (ms = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
