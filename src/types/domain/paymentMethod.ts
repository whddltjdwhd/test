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
    invalidReson: string | null
    key: string
    payMmthodDisplayName: string
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
    ndi: string | null
    registerDatetime: string
    recentUpdateDatetime: string
    recentUseDatetime: string
    offlineYn: 'y' | 'n'
    cardCompanyId: string
    cardCompanyName: string
    maskedCardNumber: string
    hyundaiMpointUseYn: 'y' | 'n'
    cardType: 'chk' | 'crd'
    cardBrand: string
    cardName: string
    cardImageUrl: string | null
    cardOwnerType: 'personal' | 'business'
    cardIssuerCode: string
    cardIssuerName: string
    valid: boolean
    billingCardCode: string | null
    cardAlias: string | null
    cardProductCode: string | null
    cardCategory: string | null
    cardProductName: string | null
    binNo: string | null
    closedYn: string | null
    benefitInitiation: string | null
    benefitFinish: string | null
    rewardRate: string | null
    benefitResidualAmount: number
    benefitCardYn: 'y' | 'n'
    offlinePaymentStatusList: string[]
    apiPauseSchedule: string | null
}

export interface Account {
    acctKey: number
    bnkCd: string
    bnkNm: string
    bnkType: 'bank' | 'card'
    maskAcctNo: string
    acctNo: string
    regCmplTime: string
    isChkCard: boolean
    nickNm: string | null
    rank: number
    payBnkbCd: string | null
    payBnkbNm: string | null
    isPayable: boolean
    isOpenBankAccount: boolean
    isPlAccount: boolean
    isRefundAccount: boolean
    isCmplAml: boolean
    inspection: string | null
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
