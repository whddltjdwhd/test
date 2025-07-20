import {http, HttpResponse} from 'msw'

import {mockDB} from './db'
import {API_ENDPOINTS, createApiUrl} from '../constants/api'

export const handlers = [
    // 단일 API - 모든 주문서 데이터를 한번에 반환
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.COMPLETE), () => {
        return HttpResponse.json({
            subscriptionDate: mockDB.getSubscriptionDate(),
            deliveryAddress: mockDB.getDeliveryAddress(),
            orderProduct: mockDB.getOrderProduct(),
            orderPayMethod: mockDB.getOrderPayMethod(),
            pointsReward: mockDB.getPointsReward(),
            deliveryMemoOptions: mockDB.getDeliveryMemoOptions(),
        })
    }),

    // 기존 개별 API들 (레거시 지원용)
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.SUBSCRIPTION_DATE), () => {
        return HttpResponse.json(mockDB.getSubscriptionDate())
    }),

    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.DELIVERY_ADDRESS), () => {
        return HttpResponse.json(mockDB.getDeliveryAddress())
    }),

    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.ORDER_PRODUCT), () => {
        return HttpResponse.json(mockDB.getOrderProduct())
    }),

    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.ORDER_PAY_METHOD), () => {
        return HttpResponse.json(mockDB.getOrderPayMethod())
    }),

    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.POINTS_REWARD), () => {
        return HttpResponse.json(mockDB.getPointsReward())
    }),

    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.DELIVERY_MEMO_OPTIONS), () => {
        return HttpResponse.json(mockDB.getDeliveryMemoOptions())
    }),
]
