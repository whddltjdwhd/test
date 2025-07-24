import {http, HttpResponse} from 'msw'

import paymentData from './data/paymentData.json'
import {mockDB} from './db'
import {API_ENDPOINTS, createApiUrl} from '../constants/api'
import {DEFAULT_ORDER_SHEET_PARAMS} from '../types/api/params'

import type {OrderSheetParams} from '../types/api/params'

export const handlers = [
    // 단일 API - 모든 주문서 데이터를 한번에 반환
    http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.COMPLETE), ({request}) => {
        // URL에서 쿼리 파라미터 추출
        const url = new URL(request.url)
        const params: OrderSheetParams = {
            orderSheetId: url.searchParams.get('orderSheetId') || DEFAULT_ORDER_SHEET_PARAMS.orderSheetId,
            deviceType:
                (url.searchParams.get('deviceType') as 'PC' | 'MOBILE') || DEFAULT_ORDER_SHEET_PARAMS.deviceType,
            osType:
                (url.searchParams.get('osType') as 'WINDOWS' | 'MAC' | 'ANDROID' | 'IOS') ||
                DEFAULT_ORDER_SHEET_PARAMS.osType,
            isMobileDisplay:
                url.searchParams.get('isMobileDisplay') === 'true' || DEFAULT_ORDER_SHEET_PARAMS.isMobileDisplay,
            backUrl: url.searchParams.get('backUrl') || DEFAULT_ORDER_SHEET_PARAMS.backUrl,
        }

        // DB를 파라미터로 초기화
        mockDB.initializeOrderSheet(params)

        return HttpResponse.json({
            subscriptionDate: mockDB.getSubscriptionDate(),
            deliveryAddress: mockDB.getDeliveryAddress(),
            orderProduct: mockDB.getOrderProduct(),
            orderPayMethod: mockDB.getOrderPayMethod(),
            pointsReward: mockDB.getPointsReward(),
            deliveryMemoOptions: mockDB.getDeliveryMemoOptions(),
        })
    }),

    // 결제수단 조회 API
    http.get(createApiUrl(API_ENDPOINTS.PAYMENT_METHOD.SUBSCRIPTION), () => {
        return HttpResponse.json(paymentData)
    }),

    // 결제수단 변경 API
    http.post(createApiUrl(API_ENDPOINTS.PAYMENT_METHOD.SUBSCRIPTION), async ({request}) => {
        const paymentInfo = (await request.json()) as {
            primaryPaymentType: string
            secondaryPaymentType: string
            selectedPrimaryCard?: string | null
            selectedSecondaryCard?: string | null
            usePointAll: boolean
        }

        // DB 업데이트
        mockDB.updatePaymentMethod(paymentInfo)

        return HttpResponse.json({
            code: '00',
            message: '성공',
            result: '결제수단이 변경되었습니다.',
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
