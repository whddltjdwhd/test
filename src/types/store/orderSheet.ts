// 개별 API 방식의 Redux 상태 타입

import type {DeliveryAddress, DeliveryMemoOption} from '../domain/delivery'
import type {OrderPayMethod, PointsReward} from '../domain/payment'
import type {OrderProduct} from '../domain/product'
import type {SubscriptionDate} from '../domain/subscription'

export interface OrderSheetState {
    subscriptionDate: SubscriptionDate | null
    deliveryAddress: DeliveryAddress | null
    orderProduct: OrderProduct | null
    orderPayMethod: OrderPayMethod | null
    pointsReward: PointsReward | null
    deliveryMemoOptions: DeliveryMemoOption[]
    loading: {
        subscriptionDate: boolean
        deliveryAddress: boolean
        orderProduct: boolean
        orderPayMethod: boolean
        pointsReward: boolean
        deliveryMemoOptions: boolean
    }
    error: {
        subscriptionDate: string | null
        deliveryAddress: string | null
        orderProduct: string | null
        orderPayMethod: string | null
        pointsReward: string | null
        deliveryMemoOptions: string | null
    }
}
