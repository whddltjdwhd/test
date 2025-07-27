export type Period = 'ONCE_PER_ONE_WEEK' | 'TWICE_PER_ONE_WEEK' | 'THREE_TIMES_PER_ONE_WEEK'
export interface SubscriptionDate {
    firstDeliveryDate: string
    firstPaymentDate: string
    periodType: Period
    periodCount: number
}
