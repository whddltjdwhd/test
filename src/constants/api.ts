// API 기본 URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.naverpay.com'

// API 엔드포인트 경로들
export const API_ENDPOINTS = {
    ORDER_SHEET: {
        // 단일 API 엔드포인트 - 모든 데이터를 한번에 가져옴
        COMPLETE: '/orderSheet/complete',

        // 기존 개별 엔드포인트들 (레거시 지원용 - 나중에 제거 예정)
        SUBSCRIPTION_DATE: '/orderSheet/subscription/date',
        DELIVERY_ADDRESS: '/orderSheet/delivery/address',
        ORDER_PRODUCT: '/orderSheet/product',
        ORDER_PAY_METHOD: '/orderSheet/payment/method',
        POINTS_REWARD: '/orderSheet/points/reward',
        DELIVERY_MEMO_OPTIONS: '/orderSheet/delivery/memo/options',
    },
    PAYMENT_METHOD: {
        SUBSCRIPTION: '/paymentMethod/subscription',
    },
} as const

// 완전한 URL을 생성하는 헬퍼 함수
export const createApiUrl = (endpoint: string): string => {
    return `${API_BASE_URL}${endpoint}`
}
