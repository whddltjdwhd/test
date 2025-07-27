import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'

import App from './app'
import {store} from './store'

const ENV = import.meta.env.VITE_ENV

if (ENV === 'development') {
    const {worker} = await import('./mocks/client')
    await worker.start()
}

createRoot(document.querySelector('#root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
