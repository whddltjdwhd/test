import {useEffect, useState} from 'react'

import {useAppDispatch, useAppSelector} from '../store/hooks'
import {selectMockOrderSheetData} from '../store/slices/mockDataSlice'
import {clearError, fetchOrderSheetComplete} from '../store/slices/orderSheetCompleteSlice'
import {DEFAULT_ORDER_SHEET_PARAMS} from '../types/api/params'

import type {OrderSheetParams} from '../types/api/params'
import type {SubscriptionInfo} from '../types/api/request'

export const OrderSheetSingleApi = () => {
    const dispatch = useAppDispatch()

    // 주문서 파라미터 상태 (사용자가 변경 가능)
    const [orderSheetParams, setOrderSheetParams] = useState<OrderSheetParams>(DEFAULT_ORDER_SHEET_PARAMS)

    // 배송 메모 관련 상태 (클라이언트에서만 관리)
    const [selectedMemoIndex, setSelectedMemoIndex] = useState<number>(0)
    const [customMemoText, setCustomMemoText] = useState<string>('')
    const [reuseCustomMemo, setReuseCustomMemo] = useState<boolean>(false)

    // 단일 API 데이터
    const {data, loading, error} = useAppSelector((state) => state.orderSheetComplete)

    // Mock 데이터 (주문서 기본 정보용)
    const mockData = useAppSelector(selectMockOrderSheetData)

    // 현재 선택된 메모를 반환하는 함수
    const getCurrentSelectedMemo = () => {
        if (!data?.deliveryMemoOptions || data.deliveryMemoOptions.length === 0) {
            return {
                memo: '',
                type: 'default' as const,
                reuseMemo: false,
                template: false,
            }
        }

        const selectedOption = data.deliveryMemoOptions[selectedMemoIndex]

        if (selectedOption?.type === 'custom') {
            return {
                memo: customMemoText,
                type: 'custom' as const,
                reuseMemo: reuseCustomMemo,
                template: false,
            }
        } else if (selectedOption?.type === 'none') {
            return {
                memo: '',
                type: 'none' as const,
                reuseMemo: false,
                template: false,
            }
        } else if (selectedOption?.type === 'template') {
            return {
                memo: selectedOption.value,
                type: 'template' as const,
                reuseMemo: true,
                template: true,
            }
        } else {
            return {
                memo: '',
                type: 'default' as const,
                reuseMemo: false,
                template: false,
            }
        }
    }

    useEffect(() => {
        // 컴포넌트 마운트 시 파라미터와 함께 단일 API로 모든 데이터 fetch
        dispatch(fetchOrderSheetComplete(orderSheetParams))
    }, [dispatch, orderSheetParams])

    const handleMemoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = parseInt(event.target.value, 10)
        setSelectedMemoIndex(selectedIndex)

        // 직접 입력하기를 선택했을 때 초기화
        const selectedOption = data?.deliveryMemoOptions[selectedIndex]
        if (selectedOption?.type === 'custom') {
            setCustomMemoText('')
            setReuseCustomMemo(false)
        }
    }

    const handleCustomMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomMemoText(event.target.value)
    }

    const handleReuseMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReuseCustomMemo(event.target.checked)
    }

    const handleClearError = () => {
        dispatch(clearError())
    }

    const handleRefreshWithNewParams = () => {
        // orderSheetId를 새로 생성해서 테스트
        const newParams: OrderSheetParams = {
            ...orderSheetParams,
            orderSheetId: `test-${Date.now()}`,
            deviceType: orderSheetParams.deviceType === 'PC' ? 'MOBILE' : 'PC',
        }
        setOrderSheetParams(newParams)
        dispatch(fetchOrderSheetComplete(newParams))
    }

    const handleSubmit = () => {
        if (!data) {
            alert('데이터가 로딩되지 않았습니다.')
            return
        }

        const currentMemo = getCurrentSelectedMemo()
        const orderSheetData = mockData

        const subscriptionInfo: SubscriptionInfo = {
            deviceType: orderSheetParams.deviceType,
            isMobileDisplay: orderSheetParams.isMobileDisplay,
            osType: orderSheetParams.osType,
            subscriptionSheetId: orderSheetParams.orderSheetId, // 동적으로 설정된 값 사용
            startRequestBody: {
                agreements: {
                    agreeSubscriptionPay: true,
                },
                coupon: {
                    selectedProductCouponIdsByOrderSheetItemId: {
                        '2025072016356181': [],
                    },
                    selectedImmediateDiscountPolicyNosByOrderSheetItemId: {},
                    selectedProductDuplicateCouponIdsByOrderSheetItemId: {},
                    selectedProductDuplicateCouponIdsByOrderSheetItemId2: {},
                    selectedSubscriptionDiscountPolicesByOrderSheetItemId: {
                        '2025072016356181': [],
                    },
                    selectedStoreCouponIdsByMerchantNo: {},
                },
                deliveryAddress: {
                    addressName: data.deliveryAddress.addressName,
                    baseAddress:
                        orderSheetData.result.subscriptionViewResult.deliveryAddressBook.defaultDeliveryAddress
                            .baseAddress,
                    detailAddress:
                        orderSheetData.result.subscriptionViewResult.deliveryAddressBook.defaultDeliveryAddress
                            .detailAddress,
                    receiverName: data.deliveryAddress.receiverName,
                    road: true,
                    telNo1: data.deliveryAddress.telNo1,
                    telNo2: data.deliveryAddress.telNo2,
                    useVirtualPhoneNumber: false,
                    zipCode:
                        orderSheetData.result.subscriptionViewResult.deliveryAddressBook.defaultDeliveryAddress
                            .zipCode || '12345',
                    deliveryMemo: currentMemo.memo,
                    deliveryMemoParticularInput: currentMemo.type === 'custom' && currentMemo.memo !== '',
                    reuseMemo: currentMemo.reuseMemo,
                    particularDeliveryMemos: null,
                    addToAddressBooks: false,
                    entryMethodContent: null,
                    entryMethodType: null,
                    personalCustomsCode: null,
                    personalCustomsCodeNeeded: false,
                    pickupLocationContent: null,
                    pickupLocationType: null,
                    saveAsPrimary: false,
                    buildingManagementNo: '',
                    locationX: '0',
                    locationY: '0',
                },
                payment: {
                    expectedPayAmount: orderSheetData.result.subscriptionViewResult.products[0].items[0].orderAmount,
                    subscriptionPayMeansNo: 'CARD_001',
                    useAllCoupon: false,
                },
            },
        }

        // eslint-disable-next-line no-console
        console.log('=== 단일 API 주문 제출 데이터 ===')
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(subscriptionInfo, null, 2))
        alert('주문이 제출되었습니다! (단일 API 방식)')
    }

    if (loading) {
        return <div>🔄 Loading all data with single API call...</div>
    }

    if (error) {
        return (
            <div>
                <div>❌ Error occurred: {error}</div>
                <button onClick={handleClearError}>Clear Error</button>
                <button onClick={() => dispatch(fetchOrderSheetComplete(orderSheetParams))}>Retry</button>
            </div>
        )
    }

    if (!data) {
        return <div>No data available</div>
    }

    return (
        <div>
            <h1>🚀 Single API 방식 주문서</h1>
            <div style={{marginBottom: '20px', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '5px'}}>
                <strong>✅ 성능 개선:</strong> 1번의 API 호출로 모든 데이터 로딩 완료!
                <br />
                <strong>현재 주문서 ID:</strong> {orderSheetParams.orderSheetId}
                <br />
                <strong>디바이스:</strong> {orderSheetParams.deviceType}
                <br />
                <button onClick={handleRefreshWithNewParams} style={{marginTop: '10px', marginRight: '10px'}}>
                    🔄 새 파라미터로 테스트
                </button>
                <button onClick={() => dispatch(fetchOrderSheetComplete(orderSheetParams))}>Refresh Data</button>
            </div>

            <div style={{display: 'flex', gap: '20px'}}>
                {/* 좌측: 모든 API 데이터 */}
                <div style={{flex: 1, border: '1px solid #ccc', padding: '10px'}}>
                    <h2>📊 Single API Response Data</h2>

                    <h3>구독 날짜 정보</h3>
                    <div>
                        <p>첫 배송일: {data.subscriptionDate.firstDeliveryDate}</p>
                        <p>첫 결제일: {data.subscriptionDate.firstPaymentDate}</p>
                        <p>주기: {data.subscriptionDate.periodType}</p>
                        <p>주기 횟수: {data.subscriptionDate.periodCount}</p>
                    </div>

                    <h3>배송 주소</h3>
                    <div>
                        <p>수신자: {data.deliveryAddress.receiverName}</p>
                        <p>주소명: {data.deliveryAddress.addressName}</p>
                        <p>전화번호1: {data.deliveryAddress.telNo1}</p>
                        <p>전화번호2: {data.deliveryAddress.telNo2}</p>
                        <p>주소: {data.deliveryAddress.address}</p>
                    </div>

                    <h3>주문 상품</h3>
                    <div>
                        <p>판매채널명: {data.orderProduct.merchantChannelName}</p>
                        <p>상품명: {data.orderProduct.productName}</p>
                        <p>수량: {data.orderProduct.quantity}</p>
                        <p>주문 금액: {data.orderProduct.orderAmount}</p>
                        <p>총 금액: {data.orderProduct.totalAmount}</p>
                    </div>

                    <h3>결제 방법</h3>
                    <div>
                        <p>포인트 전체 사용: {data.orderPayMethod.usePointAll ? '예' : '아니오'}</p>
                        <p>결제 방법들: {data.orderPayMethod.payMethodNames.join(', ')}</p>
                    </div>

                    <h3>포인트 리워드</h3>
                    <div>
                        <p>최대 리워드: {data.pointsReward.maxReward}</p>
                        <p>구매 리워드: {data.pointsReward.purchaseReward}</p>
                    </div>
                </div>

                {/* 우측: 배송 메모 선택 */}
                <div style={{flex: 1, border: '1px solid #ccc', padding: '10px'}}>
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
                            value={selectedMemoIndex}
                            onChange={handleMemoChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px',
                            }}
                        >
                            {data.deliveryMemoOptions.map((option, index) => (
                                <option key={option.id} value={index}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{marginTop: '10px', display: 'flex', alignItems: 'center'}}>
                        <input
                            id="reuse-memo"
                            type="checkbox"
                            checked={reuseCustomMemo}
                            onChange={handleReuseMemoChange}
                            style={{marginRight: '8px'}}
                        />
                        <label htmlFor="reuse-memo" style={{fontSize: '14px', cursor: 'pointer'}}>
                            📝 다음에도 사용할게요
                        </label>
                    </div>

                    {data.deliveryMemoOptions[selectedMemoIndex]?.type === 'custom' && (
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
                            {getCurrentSelectedMemo().memo || '메모 없음'}
                        </p>
                        <small style={{color: '#666'}}>타입: {getCurrentSelectedMemo().type}</small>
                    </div>
                </div>
            </div>

            {/* 주문 제출 섹션 */}
            <div
                style={{
                    marginTop: '30px',
                    padding: '20px',
                    border: '2px solid #28a745',
                    borderRadius: '8px',
                    backgroundColor: '#f8fff8',
                    textAlign: 'center',
                }}
            >
                <h2 style={{margin: '0 0 15px 0', color: '#28a745'}}>🚀 Single API 주문 제출</h2>
                <p style={{margin: '0 0 20px 0', color: '#666'}}>단일 API 호출로 로딩된 데이터로 주문을 제출합니다.</p>
                <button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    ⚡ 빠른 주문 제출하기
                </button>
            </div>
        </div>
    )
}
