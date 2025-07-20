// 주문서 조회 요청 파라미터
export interface OrderSheetParams {
    orderSheetId: string
    deviceType: 'PC' | 'MOBILE'
    osType: 'WINDOWS' | 'MAC' | 'ANDROID' | 'IOS'
    isMobileDisplay: boolean
    backUrl?: string
}

// 주문서 조회를 위한 기본 파라미터
export const DEFAULT_ORDER_SHEET_PARAMS: OrderSheetParams = {
    orderSheetId: '9c77f72c-1650-a698-4a93-d1b03a5b3989',
    deviceType: 'PC',
    osType: 'WINDOWS',
    isMobileDisplay: false,
    backUrl: 'https://brand.naver.com/baeksansoo/products/556383444',
}
