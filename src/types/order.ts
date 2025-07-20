export type Period =
    | 'ONCE_PER_ONE_WEEK'
    | 'ONCE_PER_TWO_WEEKS'
    | 'ONCE_PER_THREE_WEEKS'
    | 'ONCE_PER_FOUR_WEEKS'
    | 'ONCE_PER_SIX_WEEKS'
    | 'ONCE_PER_EIGHT_WEEKS'
    | 'ONCE_PER_TWELVE_WEEKS'
    | 'ONCE_PER_SIXTEEN_WEEKS'
    | 'ONCE_PER_TWENTY_FOUR_WEEKS'
    | 'ONCE_PER_THIRTY_SIX_WEEKS'
    | 'ONCE_PER_FIFTY_TWO_WEEKS'
export interface SubscriptionDate {
    firstDeliveryDate: string
    firstPaymentDate: string
    periodType: Period
    periodCount: number
}

interface DeliveryMemo {
    memo: string
    memoSeq: number
    reuseMemo: boolean
    template: boolean
}
export interface DeliveryAddress {
    receiverName: string
    addressName: string
    telNo1: string
    telNo2: string
    address: string
    memo: DeliveryMemo
}

interface DeliveryPolicy {
    deliveryMethodType: 'DELIVERY' | 'PICKUP'
    deliveryFeeClassType: 'FREE' | 'PAID'
}
export interface OrderProduct {
    merchantChannelName: string
    deliveryPolicy: DeliveryPolicy
    productName: string
    quantity: number
    discountedAmount: number
    orderAmount: number
    totalAmount: number
}

export interface OrderPayMethod {
    usePointAll: boolean
    payMethodNames: string[]
    cashReceiptApply: boolean
    cashReceiptInfo: string
}

export interface PointsReward {
    maxReward: number
    purchaseReward: number
    adminReward: number
    sellerReward: number
    reviewReward: number
}
