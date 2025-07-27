import type {SubscriptionDate} from '../../domain/orderDate'
import type {OrderPayMethod} from '../../domain/paymentMethod'
import type {PointsReward} from '../../domain/pointsReward'
import type {OrderProduct} from '../../domain/product'
import type {DeliveryAddress} from '../subscription/requestBody'

export interface OrderSheetResponse {
    subscriptionDate: SubscriptionDate
    deliveryAddress: DeliveryAddress
    orderProduct: OrderProduct
    orderPayMethod: OrderPayMethod
    pointsReward: PointsReward
}
