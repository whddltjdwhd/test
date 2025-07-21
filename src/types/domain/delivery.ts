// 배송 관련 도메인 타입

export interface DeliveryMemo {
    memo: string
    memoSeq: number
    reuseMemo: boolean
    template: boolean
}

export interface DeliveryMemoOption {
    id: string
    label: string
    value: string
    type: 'default' | 'none' | 'custom' | 'template'
}

export interface DeliveryAddress {
    receiverName: string
    addressName: string
    telNo1: string
    telNo2: string
    address: string
    memos: DeliveryMemo[]
}
