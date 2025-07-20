// 단일 API 응답을 위한 통합 타입
import type {
    DeliveryAddress,
    DeliveryMemoOption,
    OrderPayMethod,
    OrderProduct,
    PointsReward,
    SubscriptionDate,
} from '../domain/order'

export interface OrderSheetCompleteResponse {
    subscriptionDate: SubscriptionDate
    deliveryAddress: DeliveryAddress
    orderProduct: OrderProduct
    orderPayMethod: OrderPayMethod
    pointsReward: PointsReward
    deliveryMemoOptions: DeliveryMemoOption[]
}

// 단순화된 UI 상태 타입
export interface OrderSheetState {
    data: OrderSheetCompleteResponse | null
    loading: boolean
    error: string | null
}
