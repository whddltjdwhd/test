export interface DeliveryAddress {
    receiverName: string
    addressName: string
    telNo1: string
    telNo2: string
    address: string
    memos: DeliveryMemo[]
}

export interface DeliveryMemo {
    memo: string
    memoSeq: number
    reuseMemo: boolean
    template: boolean
}
