export interface OrderPayMethod {
    usePointAll: boolean
    payMethods: OrderPayMethodInfo[]
    cashReceiptApply: boolean
    cashReceipt: CashReceipt
}

export interface OrderPayMethodInfo {
    cardName: string | null
    cardType: string
    corporationCode: string
    corporationName: string
    invalidReason: string | null
    key: string
    payMethodDisplayNumber: string
    payMethodImageUrl: string | null
    payMethodName: string
    payMethodType: string
    reward: null | boolean
    valid: boolean
}

export interface Card {
    cid: string
    naverId: string
    naverIdNo: string
    naverPayMemberNo: number
    ndi: unknown
    registerDatetime: string
    recentUpdateDatetime: string
    recentUseDatetime: string
    offlineYn: string
    cardCompunknownId: string
    cardCompunknownName: string
    maskedCardNumber: string
    hyundaiMpointUseYn: string
    cardType: string
    cardBrand: string
    cardName: string
    cardImageUrl: string
    cardOwnerType: string
    cardIssuerCode: string
    cardIssuerName: string
    valid: boolean
    billingCardCode: string
    cardAlias: unknown
    cardProductCode: string
    cardCategory: unknown
    cardProductName: string
    binNo: string
    closedYn: unknown
    benefitInitiation: unknown
    benefitFinish: unknown
    rewardRate: unknown
    benefitResidualAmount: number
    benefitCardYn: string
    offlinePaymentStatusList: string[]
    apiPauseSchedule: unknown
}

export interface Account {
    acctKey: number
    bnkCd: string
    bnkNm: string
    bnkType: string
    maskAcctNo: string
    acctNo: string
    regCmplTime: string
    isChkCard: boolean
    nickNm: unknown
    rank: number
    payBnkbCd: unknown
    payBnkbNm: unknown
    isPayable: boolean
    isOpenBankAccount: boolean
    isPlAccount: boolean
    isRefundAccount: boolean
    isCmplAml: boolean
    inspection: unknown
    isPendingPayable: boolean
}

export interface PrevPaymentMethodInfo {
    isRegistered: boolean
    registeredPaymetnGateways: PaymentGateway[]
    cashReceipt: CashReceipt
    recentPayInfo: string[]
}

export interface PaymentGateway {
    corpKey: string
    corpcd: string
    order: number
    pgcd: string
}

export type CashReceiptUsageType = 'PERSONAL_INCOME_TAX' | 'BIZ_EXPENSE_PROOF'
export type CashReceiptIssueType =
    | 'PR_CELL_PHONE_NUMBER'
    | 'PR_CASH_RECEPT_CARD_NUMBER'
    | 'BUSINESS_REGISTRATION_NUMBER'
export interface CashReceipt {
    issueNumber: string
    usageType: CashReceiptUsageType
    issueType: CashReceiptIssueType
    businessRegistrationNumberFirst: string | null
    businessRegistrationNumberSecond: string | null
    businessRegistrationNumberThird: string | null
    mobilePhoneNumberFirst: string | null
    mobilePhoneNumberSecond: string | null
    mobilePhoneNumberThird: string | null
    cashReceiptCardNumberFirst: string | null
    cashReceiptCardNumberSecond: string | null
    cashReceiptCardNumberThird: string | null
    cashReceiptCardNumberFourth: string | null
}
