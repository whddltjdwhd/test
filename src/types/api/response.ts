// API 응답 타입 정의

import type {DeliveryAddress, DeliveryMemoOption} from '../domain/delivery'
import type {OrderPayMethod, PointsReward} from '../domain/payment'
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
