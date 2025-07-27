import {useEffect} from 'react'

import {useDispatch} from 'react-redux'

import {DeliveryAddressComponent} from './components/DeliveryAddress'
import {OrderPayMethodComponent} from './components/OrderPayMethod'
import {OrderProductComponent} from './components/OrderProduct'
import {PointsRewardComponent} from './components/PointsReward'
import {SubscriptionDateComponent} from './components/SubscriptionDate'
import {useOrderSheet} from './hooks/useOrderSheet'
import {fetchOrderSheet} from './store/slices/server/orderSheetSlice'

import type {AppDispatch} from './store'

function App() {
    const dispatch: AppDispatch = useDispatch()

    const {data: orderSheetData, loading, error} = useOrderSheet()

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log('Fetching order sheet data...')
        dispatch(fetchOrderSheet())
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!orderSheetData) {
        return <div>No data available</div>
    }

    const {subscriptionDate, deliveryAddress, orderProduct, orderPayMethod, pointsReward} = orderSheetData

    return (
        <div>
            <h1>구독 주문서</h1>
            {subscriptionDate && <SubscriptionDateComponent {...subscriptionDate} />}
            {deliveryAddress && <DeliveryAddressComponent {...deliveryAddress} />}
            {orderProduct && <OrderProductComponent {...orderProduct} />}
            {orderPayMethod && <OrderPayMethodComponent {...orderPayMethod} />}
            {pointsReward && <PointsRewardComponent {...pointsReward} />}
        </div>
    )
}

export default App
