import {useState} from 'react'

import {OrderSheetExampleWithRedux} from './components/OrderSheetExampleWithRedux'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div />
            <h1>이성종!??</h1>
            <div className="card">
                <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

            {/* Redux + Axios + Mock 데이터 통합 컴포넌트 */}
            <OrderSheetExampleWithRedux />

            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    )
}

export default App
