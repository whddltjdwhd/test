// 상품 관련 도메인 타입

export type DeliveryFeeClassType = 'FREE' | 'PAID'

export interface OrderProduct {
    merchantChannelName: string
    deliveryPolicy: DeliveryFeeClassType
    productName: string
    quantity: number
    subscriptionDiscountedAmount: number
    orderAmount: number
    totalOrderAmount: number
}
