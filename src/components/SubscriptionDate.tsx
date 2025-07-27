import type {SubscriptionDate} from '../types/domain/orderDate'

type SubscriptionDateProps = SubscriptionDate

export const SubscriptionDateComponent = (props: SubscriptionDateProps) => {
    const {firstDeliveryDate, firstPaymentDate, periodType, periodCount} = props

    const getPeriodText = (type: typeof periodType) => {
        switch (type) {
            case 'ONCE_PER_ONE_WEEK':
                return '주 1회'
            case 'TWICE_PER_ONE_WEEK':
                return '주 2회'
            case 'THREE_TIMES_PER_ONE_WEEK':
                return '주 3회'
            default:
                return type
        }
    }

    return (
        <div className="subscription-date">
            <h3>구독 일정</h3>
            <div className="date-info">
                <p>
                    <strong>첫 배송일:</strong> {firstDeliveryDate}
                </p>
                <p>
                    <strong>첫 결제일:</strong> {firstPaymentDate}
                </p>
                <p>
                    <strong>배송 주기:</strong> {getPeriodText(periodType)}
                </p>
                <p>
                    <strong>총 배송 횟수:</strong> {periodCount}회
                </p>
            </div>
        </div>
    )
}
