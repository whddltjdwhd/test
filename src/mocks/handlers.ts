import {http, HttpResponse} from 'msw'

import {dbWithRedux} from './dbWithRedux'
import {API_ENDPOINTS, createApiUrl} from '../constants/api'

export const handlers = [
    // 구독 날짜 정보 조회
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.SUBSCRIPTION_DATE), () => {
        return HttpResponse.json(dbWithRedux.getSubscriptionDate())
    }),

    // 배송 주소 정보 조회
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.DELIVERY_ADDRESS), () => {
        return HttpResponse.json(dbWithRedux.getDeliveryAddress())
    }),

    // 주문 상품 정보 조회
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.ORDER_PRODUCT), () => {
        return HttpResponse.json(dbWithRedux.getOrderProduct())
    }),

    // 결제 방법 정보 조회
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.ORDER_PAY_METHOD), () => {
        return HttpResponse.json(dbWithRedux.getOrderPayMethod())
    }),

    // 포인트 리워드 정보 조회
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.POINTS_REWARD), () => {
        return HttpResponse.json(dbWithRedux.getPointsReward())
    }),
]
