export interface PointsReward {
    maxReward: number
    purchaseReward: number
    adminReward: number
    sellerReward: number
    reviewReward: number
}

export interface PaymoneyAndPointResult {
    paymoney: Paymoney
    reward: Reward
}

export interface Paymoney {
    resultType: string
    resultCode: string
    resultMessage: string
    coinType: string
    balanceAmount: number
    availableAmount: number
    overseasBalanceAmount: number
    overseasAvailableAmount: number
    cashableBalanceAmount: number
    includeNonCashEvidence: boolean
    renewYn: string
}

export interface Reward {
    resultType: string
    resultCode: string
    resultMessage: string
    balanceAmount: number
    welfareBalanceAmount: number
    description: string[]
}
