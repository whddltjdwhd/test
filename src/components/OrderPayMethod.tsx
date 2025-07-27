import type {OrderPayMethod} from '../types/domain/paymentMethod'

type OrderPayMethodProps = OrderPayMethod

export const OrderPayMethodComponent = (props: OrderPayMethodProps) => {
    const {usePointAll, payMethods, cashReceiptApply, cashReceipt} = props

    return (
        <div className="order-pay-method">
            <h3>결제 수단</h3>
            <div className="payment-info">
                <p>
                    <strong>포인트 전액 사용:</strong> {usePointAll ? '예' : '아니오'}
                </p>
                <p>
                    <strong>현금영수증 신청:</strong> {cashReceiptApply ? '예' : '아니오'}
                </p>

                <div className="payment-methods">
                    <h4>결제 수단 목록</h4>
                    {payMethods.map((method, index) => (
                        <div key={`${method.key}-${index}`} className="payment-method">
                            <p>
                                <strong>결제 수단명:</strong> {method.payMethodName}
                            </p>
                            <p>
                                <strong>카드명:</strong> {method.cardName || '해당없음'}
                            </p>
                            <p>
                                <strong>결제 번호:</strong> {method.payMethodDisplayNumber}
                            </p>
                            <p>
                                <strong>유효:</strong> {method.valid ? '유효' : '무효'}
                            </p>
                            {!method.valid && method.invalidReason && (
                                <p>
                                    <strong>무효 사유:</strong> {method.invalidReason}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {cashReceipt && (
                    <div className="cash-receipt">
                        <h4>현금영수증 정보</h4>
                        <p>
                            <strong>발급 번호:</strong> {cashReceipt.issueNumber}
                        </p>
                        <p>
                            <strong>사용 구분:</strong> {cashReceipt.usageType}
                        </p>
                        <p>
                            <strong>발급 타입:</strong> {cashReceipt.issueType}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
