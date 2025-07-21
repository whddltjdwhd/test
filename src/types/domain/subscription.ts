// 구독 관련 도메인 타입

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
