export interface SubscriptionInfo {
    deviceType: string
    isMobileDisplay: boolean
    osType: string
    startRequestBody: StartRequestBody
    subscriptionSheetId: string
}

export interface StartRequestBody {
    agreements: Agreements
    coupon: Coupon
    deliveryAddress: DeliveryAddress
    payment: Payment
}

export interface Agreements {
    agreeSubscriptionPay: boolean
}

export interface Coupon {
    selectedProductCouponIdsByOrderSheetItemId: SelectedSByOrderSheetItemID
    selectedImmediateDiscountPolicyNosByOrderSheetItemId: Selected
    selectedProductDuplicateCouponIdsByOrderSheetItemId: Selected
    selectedProductDuplicateCouponIdsByOrderSheetItemId2: Selected
    selectedSubscriptionDiscountPolicesByOrderSheetItemId: SelectedSByOrderSheetItemID
    selectedStoreCouponIdsByMerchantNo: Selected
}

export type Selected = object

export interface SelectedSByOrderSheetItemID {
    '2025072016356181': The2025072016356181[]
}

export interface The2025072016356181 {
    benefitType: string
    count: string
    discountUnitType: string
    discountValue: number
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
