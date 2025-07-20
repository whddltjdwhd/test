import {useState} from 'react'

import {OrderSheetExampleWithRedux} from './components/OrderSheetExampleWithRedux'
import {OrderSheetSingleApi} from './components/OrderSheetSingleApi'

function App() {
    const [count, setCount] = useState(0)
    const [currentView, setCurrentView] = useState<'multiple' | 'single'>('single')

    return (
        <>
            <div />
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

            <div className="card">
                <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    )
}

export default App
