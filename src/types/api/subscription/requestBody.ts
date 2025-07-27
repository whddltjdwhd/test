import type {DeviceType, OsType} from '../../shared/request'

export interface SubscriptionRequest {
    deviceType: DeviceType
    isMobileDisplay: boolean
    osType: OsType
    startRequestBody: StartRequestBody
    subscriptionSheetId: string
}

export interface StartRequestBody {
    agreements: Agreements
    coupon: unknown
    deliveryAddress: DeliveryAddress
    payment: Payment
}

export interface Agreements {
    agreeSubscriptionPay: boolean
}

export interface DeliveryAddress {
    addressName: string
    baseAddress: string
    detailAddress: string
    receiverName: string
    road: boolean
    telNo1: string
    telNo2: string
    useVirtualPhoneNumber: boolean
    zipCode: string
    deliveryMemo: string
    deliveryMemoParticularInput: boolean
    reuseMemo: boolean
    particularDeliveryMemos: null
    addToAddressBooks: boolean
    entryMethodContent: null
    entryMethodType: null
    personalCustomsCode: null
    personalCustomsCodeNeeded: boolean
    pickupLocationContent: null
    pickupLocationType: null
    saveAsPrimary: boolean
    buildingManagementNo: string
    locationX: string
    locationY: string
}

export interface Payment {
    expectedPayAmount: number
    subscriptionPayMeansNo: string
    useAllCoupon: boolean
}
