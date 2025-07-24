// 결제 관련 도메인 타입

export interface PaymentMethodCard {
    cid: string
    cardCompanyName: string
    maskedCardNumber: string
    cardName: string
    cardImageUrl: string
    cardType: 'chk' | 'crd'
    cardBrand: string
    valid: boolean
}

export interface PaymentMethodAccount {
    acctKey: number
    bnkCd: string
    bnkNm: string
    maskAcctNo: string
    isPayable: boolean
}

export interface CashReceipt {
    issueNumber: string
    usageType: 'PERSONAL_INCOME_TAX' | 'BUSINESS_EXPENSE'
    issueType: 'PR_CELL_PHONE_NUMBER' | 'BUSINESS_REGISTRATION_NUMBER'
    mobilePhoneNumberFirst?: string
    mobilePhoneNumberSecond?: string
    mobilePhoneNumberThird?: string
    businessRegistrationNumberFirst?: string
    businessRegistrationNumberSecond?: string
    businessRegistrationNumberThird?: string
}

export interface PaymentBalance {
    paymoney: {
        balanceAmount: number
        availableAmount: number
    }
    reward: {
        balanceAmount: number
        welfareBalanceAmount: number
    }
}

export type PaymentType = 'CARD' | 'PAYMONEY' | 'POINT' | 'NONE'
export type PreferredPointType = 'POINT' | 'PAYMONEY'
