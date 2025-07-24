// API 응답 타입 정의

import type {DeliveryAddress, DeliveryMemoOption} from '../domain/delivery'
import type {OrderPayMethod, PointsReward} from '../domain/payment'
import type {
    PaymentMethodCard,
    PaymentMethodAccount,
    CashReceipt,
    PaymentBalance,
    PreferredPointType,
} from '../domain/paymentMethod'
import type {OrderProduct} from '../domain/product'
import type {SubscriptionDate} from '../domain/subscription'

// 단일 API 응답을 위한 통합 타입
export interface OrderSheetCompleteResponse {
    subscriptionDate: SubscriptionDate
    deliveryAddress: DeliveryAddress
    orderProduct: OrderProduct
    orderPayMethod: OrderPayMethod
    pointsReward: PointsReward
    deliveryMemoOptions: DeliveryMemoOption[]
}

// 결제수단 변경 API 응답 타입
export interface PaymentMethodResponse {
    prevPaymentMethodInfo: {
        regPgs: {
            pgcd: string
            corpcd: string
            corpKey: string
            order: number
        }[]
        cashReceipt: CashReceipt
        recentPayInfo: {
            preferredPoint: PreferredPointType[]
        }
        isRegistered: boolean
        usePointAll: boolean
    }
    memberInfoResult: {
        version: string
        account: null
        adult: boolean
        isAMLTarget: boolean
        resultType: string
        currMemberType: string
    }
    accountResult: {
        resultCode: string
        resultMessage: string
        isAgreedOpenBank: boolean
        acctList: PaymentMethodAccount[]
    }
    cardResult: {
        result: {
            summary: string
            count: number
            cardList: PaymentMethodCard[]
        }
        code: string
        message: string
    }
    paymoneyAndPointResult: PaymentBalance
    chargePointLimitResult: {
        balanceLimitAmount: number
        pgcdLimitAmount: number
        pgidLimitAmount: number
        minorLimitAmount: number
        resultType: string
    }
    naverIdNo: string
}
