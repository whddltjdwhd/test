// 결제 관련 도메인 타입

export interface OrderPayMethod {
    usePointAll: boolean
    payMethodNames: string[]
    cashReceiptApply: boolean
    cashReceiptInfo: string
}

export interface PointsReward {
    maxReward: number
    purchaseReward: number
    adminReward: number
    sellerReward: number
    reviewReward: number
}
