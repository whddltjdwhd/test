import type {Account, Card, PrevPaymentMethodInfo} from '../../domain/paymentMethod'
import type {PaymoneyAndPointResult} from '../../domain/pointsReward'

export interface PayMethodResponse {
    prevPaymentMethodInfo: PrevPaymentMethodInfo
    paymoneyAndPointResult: PaymoneyAndPointResult
    cardResult: Card[]
    accountResult: Account[]
}
