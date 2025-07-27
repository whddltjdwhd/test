import {useStartSubscription} from '../hooks/useStartSubscription'
import {useAppSelector} from '../store'
import {selectDeliveryAddress} from '../store/selectors'

export const DeliveryAddressComponent = () => {
    // 1. 서버 상태에서 배송지 정보를 가져옵니다 (메모 목록 포함)
    const deliveryAddressData = useAppSelector(selectDeliveryAddress)

    // 2. 클라이언트 상태와 상태 변경 함수를 가져옵니다.
    //    변수명 충돌을 피하기 위해 선택된 메모는 'selectedMemo'로 별칭을 부여합니다.
    const {deliveryMemo: selectedMemo, setDeliveryMemo} = useStartSubscription()

    // 서버 데이터가 없으면 렌더링하지 않습니다.
    if (!deliveryAddressData) {
        return null
    }

    const {addressName, address, receiverName, telNo1, telNo2, deliveryMemo: memoOptions} = deliveryAddressData
    const handleMemoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // 이벤트 타겟의 value는 문자열이므로 숫자로 변환합니다.
        const selectedSeq = Number(e.target.value)
        // 전체 메모 옵션에서 선택된 memoSeq와 일치하는 객체를 찾습니다.
        const selectedOption = memoOptions.find((memo) => memo.memoSeq === selectedSeq)

        // 일치하는 옵션을 찾았다면 클라이언트 상태를 업데이트합니다.
        if (selectedOption) {
            setDeliveryMemo(selectedOption)
        }
    }

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
                    <strong>배송 메모 선택:</strong>
                    <div className="current-selection">
                        <p>현재 선택: {selectedMemo.memo || '선택된 메모 없음'}</p>
                    </div>

                    <div className="delivery-memos">
                        <strong>배송 메모 선택:</strong>
                        {memoOptions.length > 0 ? (
                            <select
                                className="memo-select"
                                // 1. select의 현재 값을 선택된 메모의 고유 ID(memoSeq)로 설정합니다.
                                value={selectedMemo?.memoSeq || ''}
                                // 2. 값이 변경될 때 핸들러를 호출합니다.
                                onChange={handleMemoChange}
                            >
                                <option value="" disabled>
                                    메모를 선택하세요
                                </option>
                                {memoOptions.map((memo) => (
                                    // 3. 각 옵션의 value를 고유 ID(memoSeq)로 설정합니다.
                                    <option key={memo.memo} value={memo.memoSeq}>
                                        {memo.memo}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>배송 메모 옵션이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
