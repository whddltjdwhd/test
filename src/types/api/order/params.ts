export interface OrderSheetParams {
    orderSheetId: string
    deviceType: 'PC' | 'MOBILE'
    osType: 'WINDOWS' | 'MAC' | 'ANDROID' | 'IOS'
    isMobileDisplay: boolean
    backUrl?: string
}
