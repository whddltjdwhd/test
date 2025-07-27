import {createRoot} from 'react-dom/client'

import App from './App'

const ENV = import.meta.env.VITE_ENV

if (ENV === 'development') {
    const {worker} = await import('./mocks/client')
    await worker.start()
}

createRoot(document.querySelector('#root')!).render(
    <>
        <App />
    </>,
)
