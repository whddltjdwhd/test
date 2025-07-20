import {useEffect, useState} from 'react'

import {dbWithRedux} from '../mocks/dbWithRedux'
import {useAppDispatch, useAppSelector} from '../store/hooks'
import {selectMockOrderSheetData, updateMockDeliveryAddress} from '../store/slices/mockDataSlice'
import {
    clearErrors,
    fetchDeliveryAddress,
    fetchOrderPayMethod,
    fetchOrderProduct,
    fetchPointsReward,
    fetchSubscriptionDate,
    updateDeliveryAddress,
} from '../store/slices/orderSheetSlice'

import type {DeliveryMemoOption} from '../types/order'

export const OrderSheetExampleWithRedux = () => {
    const dispatch = useAppDispatch()

    // 배송 메모 관련 상태
    const [selectedMemoOption, setSelectedMemoOption] = useState<string>('default')
    const [customMemoText, setCustomMemoText] = useState<string>('')
    const [memoOptions, setMemoOptions] = useState<DeliveryMemoOption[]>([])

    // API 데이터 (Redux thunk 결과)
    const {subscriptionDate, deliveryAddress, orderProduct, orderPayMethod, pointsReward, loading, error} =
        useAppSelector((state) => state.orderSheet)

    // Mock 데이터 (Redux store에서 직접)
    const mockData = useAppSelector(selectMockOrderSheetData)

    useEffect(() => {
        // 컴포넌트 마운트 시 모든 데이터 fetch
        dispatch(fetchSubscriptionDate())
        dispatch(fetchDeliveryAddress())
        dispatch(fetchOrderProduct())
        dispatch(fetchOrderPayMethod())
        dispatch(fetchPointsReward())

        // 배송 메모 옵션 로드
        const options = dbWithRedux.getDeliveryMemoOptions()
        setMemoOptions(options)
    }, [dispatch])

    const handleUpdateDeliveryAddress = () => {
        // Redux thunk를 통한 API 호출
        dispatch(
            updateDeliveryAddress({
                receiverName: '새로운 수신자',
                addressName: '새 주소',
            }),
        )
    }

    const handleUpdateMockData = () => {
        // Mock 데이터 직접 업데이트 (Redux action)
        dispatch(
            updateMockDeliveryAddress({
                receiverName: 'Mock에서 변경된 이름',
                addressName: 'Mock 주소',
            }),
        )
    }

    const handleMemoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        setSelectedMemoOption(selectedValue)

        // 옵션에 따른 처리
        const selectedOption = memoOptions.find((option) => option.id === selectedValue)
        if (!selectedOption) {
            return
        }

        if (selectedOption.type === 'template') {
            // 템플릿 메모 선택
            dbWithRedux.updateDeliveryMemo(selectedOption.value, 'template')
        } else if (selectedOption.type === 'none') {
            // 선택 안함
            dbWithRedux.updateDeliveryMemo('', 'none')
        } else if (selectedOption.type === 'custom') {
            // 직접 입력하기 - 텍스트 필드 활성화만
            setCustomMemoText('')
        }
    }

    const handleCustomMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value
        setCustomMemoText(text)
        // 실시간으로 업데이트하지 않고 blur나 버튼 클릭 시 업데이트하도록 변경 가능
        dbWithRedux.updateDeliveryMemo(text, 'custom')
    }

    const handleClearErrors = () => {
        dispatch(clearErrors())
    }

    const isLoading = Object.values(loading).some(Boolean)
    const hasError = Object.values(error).some(Boolean)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (hasError) {
        return (
            <div>
                <div>Errors occurred:</div>
                {Object.entries(error).map(
                    ([key, value]) =>
                        value && (
                            <div key={key}>
                                {key}: {value}
                            </div>
                        ),
                )}
                <button onClick={handleClearErrors}>Clear Errors</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Redux 통합 예시</h1>

            <div style={{display: 'flex', gap: '20px'}}>
                {/* API 데이터 (thunk 결과) */}
                <div style={{flex: 1, border: '1px solid #ccc', padding: '10px'}}>
                    <h2>API 데이터 (Redux Thunk)</h2>

                    <h3>구독 날짜 정보</h3>
                    {subscriptionDate && (
                        <div>
                            <p>첫 배송일: {subscriptionDate.firstDeliveryDate}</p>
                            <p>첫 결제일: {subscriptionDate.firstPaymentDate}</p>
                            <p>주기: {subscriptionDate.periodType}</p>
                            <p>주기 횟수: {subscriptionDate.periodCount}</p>
                        </div>
                    )}

                    <h3>배송 주소</h3>
                    {deliveryAddress && (
                        <div>
                            <p>수신자: {deliveryAddress.receiverName}</p>
                            <p>주소명: {deliveryAddress.addressName}</p>
                            <p>전화번호1: {deliveryAddress.telNo1}</p>
                            <p>전화번호2: {deliveryAddress.telNo2}</p>
                            <p>주소: {deliveryAddress.address}</p>
                            <p>배송 메모: {deliveryAddress.memo.memo || '선택된 메모 없음'}</p>
                        </div>
                    )}

                    <h3>주문 상품</h3>
                    {orderProduct && (
                        <div>
                            <p>판매채널명: {orderProduct.merchantChannelName}</p>
                            <p>상품명: {orderProduct.productName}</p>
                            <p>수량: {orderProduct.quantity}</p>
                            <p>할인 금액: {orderProduct.discountedAmount}</p>
                            <p>주문 금액: {orderProduct.orderAmount}</p>
                            <p>총 금액: {orderProduct.totalAmount}</p>
                        </div>
                    )}

                    <h3>결제 방법</h3>
                    {orderPayMethod && (
                        <div>
                            <p>포인트 전체 사용: {orderPayMethod.usePointAll ? '예' : '아니오'}</p>
                            <p>결제 방법들: {orderPayMethod.payMethodNames.join(', ')}</p>
                            <p>현금영수증 적용: {orderPayMethod.cashReceiptApply ? '예' : '아니오'}</p>
                            <p>현금영수증 정보: {orderPayMethod.cashReceiptInfo}</p>
                        </div>
                    )}

                    <h3>포인트 리워드</h3>
                    {pointsReward && (
                        <div>
                            <p>최대 리워드: {pointsReward.maxReward}</p>
                            <p>구매 리워드: {pointsReward.purchaseReward}</p>
                            <p>관리자 리워드: {pointsReward.adminReward}</p>
                            <p>판매자 리워드: {pointsReward.sellerReward}</p>
                            <p>리뷰 리워드: {pointsReward.reviewReward}</p>
                        </div>
                    )}

                    <button onClick={handleUpdateDeliveryAddress}>API로 배송지 업데이트</button>
                </div>

                {/* Mock 데이터 */}
                <div style={{flex: 1, border: '1px solid #ccc', padding: '10px'}}>
                    <h2>Mock 데이터 (Redux Store)</h2>
                    <p>
                        수신자:{' '}
                        {
                            mockData?.result?.subscriptionViewResult?.deliveryAddressBook?.defaultDeliveryAddress
                                ?.receiverName
                        }
                    </p>
                    <p>
                        주소명:{' '}
                        {
                            mockData?.result?.subscriptionViewResult?.deliveryAddressBook?.defaultDeliveryAddress
                                ?.addressName
                        }
                    </p>
                    <p>
                        전화번호:{' '}
                        {mockData?.result?.subscriptionViewResult?.deliveryAddressBook?.defaultDeliveryAddress?.telNo1}
                    </p>

                    <div style={{marginTop: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '5px'}}>
                        <h3>배송 메모 선택</h3>

                        <div style={{marginBottom: '10px'}}>
                            <label
                                htmlFor="memo-select"
                                style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}
                            >
                                배송 메모:
                            </label>
                            <select
                                id="memo-select"
                                value={selectedMemoOption}
                                onChange={handleMemoChange}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                }}
                            >
                                {memoOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedMemoOption === 'custom' && (
                            <div style={{marginTop: '10px'}}>
                                <label
                                    htmlFor="custom-memo"
                                    style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}
                                >
                                    직접 입력:
                                </label>
                                <input
                                    id="custom-memo"
                                    type="text"
                                    value={customMemoText}
                                    onChange={handleCustomMemoChange}
                                    placeholder="배송 메모를 직접 입력해주세요"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                    }}
                                />
                            </div>
                        )}

                        <div
                            style={{
                                marginTop: '10px',
                                padding: '10px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                            }}
                        >
                            <strong>현재 선택된 메모:</strong>
                            <p style={{margin: '5px 0', fontStyle: 'italic'}}>
                                {mockData?.result?.subscriptionViewResult?.deliveryAddressBook
                                    ?.recentUsedDeliveryMemosReuse?.[0]?.memo || '메모 없음'}
                            </p>
                        </div>
                    </div>

                    <button onClick={handleUpdateMockData} style={{marginTop: '10px'}}>
                        Mock 데이터 직접 업데이트
                    </button>
                </div>
            </div>
        </div>
    )
}
