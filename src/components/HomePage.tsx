import {Link} from 'react-router-dom'

export const HomePage = () => {
    return (
        <div style={{padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
            <h1>🏠 네이버페이 데모</h1>
            <p style={{fontSize: '18px', color: '#666', marginBottom: '40px'}}>
                네이버페이의 다양한 기능을 체험해보세요
            </p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
                <Link
                    to="/order-sheet"
                    style={{
                        display: 'inline-block',
                        padding: '15px 30px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        minWidth: '200px',
                    }}
                >
                    📋 주문서 페이지
                </Link>

                <Link
                    to="/paymentMethod/subscription"
                    style={{
                        display: 'inline-block',
                        padding: '15px 30px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        minWidth: '200px',
                    }}
                >
                    💳 결제수단 변경
                </Link>
            </div>

            <div style={{marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
                <h2>🚀 기능 소개</h2>
                <div style={{textAlign: 'left', marginTop: '20px'}}>
                    <h3>📋 주문서 페이지</h3>
                    <ul>
                        <li>개별 API vs 단일 API 방식 비교</li>
                        <li>Redux를 통한 상태 관리</li>
                        <li>MSW를 활용한 API 모킹</li>
                        <li>실시간 성능 모니터링</li>
                    </ul>

                    <h3>💳 결제수단 변경</h3>
                    <ul>
                        <li>포인트/머니 전액 사용 토글</li>
                        <li>1순위/2순위 결제수단 연동</li>
                        <li>카드 중복 선택 방지</li>
                        <li>현금영수증 발급 옵션</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
