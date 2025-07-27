import {http, HttpResponse} from 'msw'

import {baseURL} from '../baseURL'
import {customError} from '../errorBase'
import {checkErrorTypeInArr} from '../utils/errorCheck'
import {ORDER_DB} from './data/db/orderDB'
import POINTS_REWARD_DB from './data/db/pointsRewardDB'

export const handlers = [
    http.get(`${baseURL}/order/info`, () => {
        const subscriptionDate = ORDER_DB.getsubscriptionDate()
        const deliveryAddress = ORDER_DB.getDeliveryAddress()
        const orderProduct = ORDER_DB.getOrderProduct()
        const orderPayMethod = ORDER_DB.getOrderPayMethod()
        const pointsReward = POINTS_REWARD_DB.getPointsReward()

        const typeErrorInArr = checkErrorTypeInArr([
            subscriptionDate,
            deliveryAddress,
            orderProduct,
            orderPayMethod,
            pointsReward,
        ])
        if (typeErrorInArr) {
            return HttpResponse.json(customError[typeErrorInArr], {status: 400})
        }
        return HttpResponse.json({
            subscriptionDate,
            deliveryAddress,
            orderProduct,
            orderPayMethod,
            pointsReward,
        })
    }),
]
