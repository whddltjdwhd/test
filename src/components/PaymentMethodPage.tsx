import {useEffect} from 'react'

import {useNavigate} from 'react-router-dom'

import {useAppDispatch, useAppSelector} from '../store/hooks'
import {
    fetchPaymentMethod,
    setCashReceiptNumber,
    setCashReceiptType,
    setSelectedPrimaryCard,
    setSelectedSecondaryCard,
    setPrimaryPaymentType,
    setSecondaryPaymentType,
    setUsePointAll,
    updatePaymentMethod,
} from '../store/slices/paymentMethodSlice'

import type {PaymentType} from '../types/domain/paymentMethod'

export const PaymentMethodPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        data,
        loading,
        error,
        usePointAll,
        primaryPaymentType,
        secondaryPaymentType,
        selectedPrimaryCard,
        selectedSecondaryCard,
        cashReceiptType,
        cashReceiptNumber,
    } = useAppSelector((state) => state.paymentMethod)

    useEffect(() => {
        dispatch(fetchPaymentMethod())
    }, [dispatch])

    const handleUsePointAllChange = (checked: boolean) => {
        dispatch(setUsePointAll(checked))
    }

    const handlePrimaryPaymentChange = (type: PaymentType) => {
        dispatch(setPrimaryPaymentType(type))
    }

    const handleSecondaryPaymentChange = (type: PaymentType) => {
        dispatch(setSecondaryPaymentType(type))
    }

    const handlePrimaryCardChange = (cardId: string) => {
        dispatch(setSelectedPrimaryCard(cardId))
    }

    const handleSecondaryCardChange = (cardId: string) => {
        dispatch(setSelectedSecondaryCard(cardId))
    }

    const handleCashReceiptTypeChange = (type: 'PHONE' | 'BUSINESS') => {
        dispatch(setCashReceiptType(type))
    }

    const handleCashReceiptNumberChange = (number: string) => {
        dispatch(setCashReceiptNumber(number))
    }

    const getPreferredLabel = (type: string, index: number) => {
        return index === 0 ? `${type} (1순위)` : `${type} (2순위)`
    }

    const getAvailableSecondaryOptions = (): PaymentType[] => {
        if (primaryPaymentType === 'PAYMONEY') {
            return ['CARD']
        }
        return ['NONE', 'PAYMONEY', 'CARD']
    }

    const getAvailableSecondaryCards = () => {
        if (!data?.cardResult.result.cardList) {
            return []
        }
        return data.cardResult.result.cardList.filter((card) => card.cid !== selectedPrimaryCard)
    }

    if (loading) {
        return <div>🔄 결제수단 정보를 불러오는 중...</div>
    }

    if (error) {
        return (
            <div>
                <div>❌ 오류: {error}</div>
                <button onClick={() => dispatch(fetchPaymentMethod())}>재시도</button>
            </div>
        )
    }

    if (!data) {
        return <div>데이터가 없습니다.</div>
    }

    return (
        <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <h1>💳 결제수단 변경</h1>

            {/* 전액 사용 토글 */}
            <div style={{marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
                <h2>💰 포인트/머니 전액 사용</h2>
                <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                    <input
                        type="checkbox"
                        checked={usePointAll}
                        onChange={(e) => handleUsePointAllChange(e.target.checked)}
                    />
                    <span>사용 가능한 포인트/머니 전액 사용하기</span>
                </label>

                {usePointAll && (
                    <div style={{marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
                        <h3>사용 가능한 포인트/머니</h3>
                        <div style={{display: 'flex', gap: '20px'}}>
                            {data.prevPaymentMethodInfo.recentPayInfo.preferredPoint.map((pointType, index) => (
                                <div key={pointType} style={{padding: '10px', border: '1px solid #ccc'}}>
                                    <div style={{fontWeight: 'bold'}}>{getPreferredLabel(pointType, index)}</div>
                                    <div>
                                        {pointType === 'PAYMONEY'
                                            ? `페이머니: ${data.paymoneyAndPointResult.paymoney.availableAmount.toLocaleString()}원`
                                            : `포인트: ${data.paymoneyAndPointResult.reward.balanceAmount.toLocaleString()}원`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 1순위 결제수단 */}
            <div style={{marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
                <h2>🥇 1순위 결제수단</h2>
                <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                    <button
                        onClick={() => handlePrimaryPaymentChange('CARD')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: primaryPaymentType === 'CARD' ? '#007bff' : '#f8f9fa',
                            color: primaryPaymentType === 'CARD' ? 'white' : 'black',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        카드
                    </button>
                    <button
                        onClick={() => handlePrimaryPaymentChange('PAYMONEY')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: primaryPaymentType === 'PAYMONEY' ? '#007bff' : '#f8f9fa',
                            color: primaryPaymentType === 'PAYMONEY' ? 'white' : 'black',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        페이머니
                    </button>
                </div>

                {primaryPaymentType === 'CARD' && (
                    <div>
                        <h3>카드 선택</h3>
                        <select
                            value={selectedPrimaryCard || ''}
                            onChange={(e) => handlePrimaryCardChange(e.target.value)}
                            style={{width: '100%', padding: '10px', marginBottom: '10px'}}
                        >
                            <option value="">카드를 선택하세요</option>
                            {data.cardResult.result.cardList.map((card) => (
                                <option key={card.cid} value={card.cid}>
                                    {card.cardName} ({card.maskedCardNumber})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* 2순위 결제수단 */}
            <div style={{marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
                <h2>🥈 2순위 결제수단</h2>
                <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                    {getAvailableSecondaryOptions().map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSecondaryPaymentChange(option)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: secondaryPaymentType === option ? '#28a745' : '#f8f9fa',
                                color: secondaryPaymentType === option ? 'white' : 'black',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {option === 'NONE' ? '선택안함' : option === 'PAYMONEY' ? '페이머니' : '카드'}
                        </button>
                    ))}
                </div>

                {secondaryPaymentType === 'CARD' && (
                    <div>
                        <h3>카드 선택</h3>
                        <select
                            value={selectedSecondaryCard || ''}
                            onChange={(e) => handleSecondaryCardChange(e.target.value)}
                            style={{width: '100%', padding: '10px', marginBottom: '10px'}}
                        >
                            <option value="">카드를 선택하세요</option>
                            {getAvailableSecondaryCards().map((card) => (
                                <option key={card.cid} value={card.cid}>
                                    {card.cardName} ({card.maskedCardNumber})
                                </option>
                            ))}
                        </select>
                        {getAvailableSecondaryCards().length === 0 && (
                            <p style={{color: '#888', fontStyle: 'italic'}}>1순위와 다른 카드만 선택 가능합니다.</p>
                        )}
                    </div>
                )}
            </div>

            {/* 현금영수증 */}
            <div style={{marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
                <h2>🧾 현금영수증</h2>
                <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                    <button
                        onClick={() => handleCashReceiptTypeChange('PHONE')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: cashReceiptType === 'PHONE' ? '#17a2b8' : '#f8f9fa',
                            color: cashReceiptType === 'PHONE' ? 'white' : 'black',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        휴대전화
                    </button>
                    <button
                        onClick={() => handleCashReceiptTypeChange('BUSINESS')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: cashReceiptType === 'BUSINESS' ? '#17a2b8' : '#f8f9fa',
                            color: cashReceiptType === 'BUSINESS' ? 'white' : 'black',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        사업자 번호
                    </button>
                </div>

                <div>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
                        {cashReceiptType === 'PHONE' ? '휴대전화 번호' : '사업자 등록번호'}
                    </label>
                    <input
                        type="text"
                        value={cashReceiptNumber}
                        onChange={(e) => handleCashReceiptNumberChange(e.target.value)}
                        placeholder={cashReceiptType === 'PHONE' ? '010-1234-5678' : '123-45-67890'}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    />
                </div>

                {/* 기본값 표시 */}
                <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px'}}>
                    <h4>현재 등록된 정보</h4>
                    <p>발급번호: {data.prevPaymentMethodInfo.cashReceipt.issueNumber}</p>
                    <p>
                        발급유형:{' '}
                        {data.prevPaymentMethodInfo.cashReceipt.issueType === 'PR_CELL_PHONE_NUMBER'
                            ? '휴대전화'
                            : '사업자번호'}
                    </p>
                </div>
            </div>

            {/* 저장 버튼 */}
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <button
                    style={{
                        padding: '15px 30px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginRight: '10px',
                    }}
                    onClick={async () => {
                        const paymentInfo = {
                            primaryPaymentType,
                            secondaryPaymentType,
                            selectedPrimaryCard,
                            selectedSecondaryCard,
                            usePointAll,
                        }

                        try {
                            await dispatch(updatePaymentMethod(paymentInfo)).unwrap()
                            alert('결제수단이 저장되었습니다!')
                            navigate('/order-sheet')
                        } catch (err) {
                            alert('결제수단 저장에 실패했습니다.')
                            // eslint-disable-next-line no-console
                            console.error(err)
                        }
                    }}
                >
                    💾 결제수단 저장
                </button>

                <button
                    style={{
                        padding: '15px 30px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/order-sheet')}
                >
                    ↩️ 주문서로 돌아가기
                </button>
            </div>
        </div>
    )
}
