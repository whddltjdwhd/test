import type {DeliveryFeeClassType} from '../domain/product'

export function deliveryFeeClassTypeGuard(deliveryFeeClassType: string): deliveryFeeClassType is DeliveryFeeClassType {
    return deliveryFeeClassType === 'FREE' || deliveryFeeClassType === 'PAID'
}
