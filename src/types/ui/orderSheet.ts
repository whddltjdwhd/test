import type {
    DeliveryAddress,
    DeliveryMemoOption,
    OrderPayMethod,
    OrderProduct,
    PointsReward,
    SubscriptionDate,
} from '../domain/order'

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
