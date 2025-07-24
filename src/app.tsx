import {useState} from 'react'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {HomePage} from './components/HomePage'
import {OrderSheetExampleWithRedux} from './components/OrderSheetExampleWithRedux'
import {OrderSheetSingleApi} from './components/OrderSheetSingleApi'
import {PaymentMethodPage} from './components/PaymentMethodPage'

function App() {
    return (
        <Router>
            <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/order-sheet" element={<OrderSheetPageWithToggle />} />
                    <Route path="/paymentMethod/subscription" element={<PaymentMethodPage />} />
                </Routes>
            </div>
        </Router>
    )
}

// 주문서 페이지 (기존 로직 유지)
function OrderSheetPageWithToggle() {
    const [currentView, setCurrentView] = useState<'multiple' | 'single'>('single')

    return (
        <div style={{padding: '20px'}}>
            <h1>네이버페이 주문서 예시</h1>

            {/* API 방식 선택 */}
            <div style={{margin: '20px 0', textAlign: 'center'}}>
                <button
                    onClick={() => setCurrentView('multiple')}
                    style={{
                        margin: '0 10px',
                        padding: '10px 20px',
                        backgroundColor: currentView === 'multiple' ? '#007bff' : '#e9ecef',
                        color: currentView === 'multiple' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    🔀 Multiple API 방식
                </button>
                <button
                    onClick={() => setCurrentView('single')}
                    style={{
                        margin: '0 10px',
                        padding: '10px 20px',
                        backgroundColor: currentView === 'single' ? '#28a745' : '#e9ecef',
                        color: currentView === 'single' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    ⚡ Single API 방식 (추천)
                </button>
            </div>

            {/* 선택된 컴포넌트 렌더링 */}
            {currentView === 'multiple' ? <OrderSheetExampleWithRedux /> : <OrderSheetSingleApi />}
        </div>
    )
}

export default App
