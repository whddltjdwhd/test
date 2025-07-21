// 상품 관련 도메인 타입

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
