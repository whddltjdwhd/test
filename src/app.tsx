import {useEffect} from 'react'

import {fetchOrderSheetData} from './api/order'

function App() {
    useEffect(() => {
        fetchOrderSheetData().catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Failed to fetch order sheet data:', error)
        })
    }, [])

    return <h1>hi</h1>
}

export default App
