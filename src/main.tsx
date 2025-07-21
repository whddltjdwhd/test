import {StrictMode} from 'react'

import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'

import App from './App'
import {store} from './store'

const ENV = import.meta.env.VITE_ENV

if (ENV === 'development') {
    const {worker} = await import('./mocks/client')
    await worker.start()
}

const list = [1, 2, 3, 4, 5]
// eslint-disable-next-line no-console
console.log(list.at(0)) // 1

createRoot(document.querySelector('#root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
