import {useEffect, useState} from 'react'

function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('http://localhost:3000/user')
            .then((response) => response.json())
            .then((data) => {
                console.log('User data:', data)
            })
            .catch((error) => {
                console.error('Error fetching user data:', error)
            })
    }, [])

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
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    )
}

export default App
