import type {DeliveryAddress} from '../types/domain/delivery'

type DeliveryAddressProps = DeliveryAddress

export const DeliveryAddressComponent = (props: DeliveryAddressProps) => {
    const {addressName, address, receiverName, telNo1, telNo2, deliveryMemo} = props

    return (
        <div className="delivery-address">
            <h3>배송 주소</h3>
            <div className="address-info">
                <p>
                    <strong>주소명:</strong> {addressName}
                </p>
                <p>
                    <strong>받는 분:</strong> {receiverName}
                </p>
                <p>
                    <strong>주소:</strong> {address}
                </p>
                <p>
                    <strong>연락처1:</strong> {telNo1}
                </p>
                <p>
                    <strong>연락처2:</strong> {telNo2}
                </p>

                <div className="delivery-memos">
                    <strong>배송 메모 옵션:</strong>
                    {deliveryMemo.length > 0 ? (
                        <ul>
                            {deliveryMemo.map((memo, index) => (
                                <li key={`${memo.memoSeq}-${index}`}>
                                    <span>{memo.memo}</span>
                                    {memo.template && <span className="badge">템플릿</span>}
                                    {memo.reuseMemo && <span className="badge">재사용</span>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>배송 메모 옵션이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
