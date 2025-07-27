import type {CashReceipt} from '../../domain/paymentMethod'

export interface UserPointBody {
    chargePointUserstatus: string
    chargePointMemberType: string
    membershipSubscribed: boolean
    deliveryFeeAmount: number
    selectedProductCouponIdsByOrderSheetItemId: object
    selectedProductDuplicateCouponIdByORderSHeetItemId: object
    selectedImmediateDiscountPolicyNosByOrderSheetItemId: object
    selectedStoreCouponIdsByMerchantNo: object
}

export interface PayMethodRequest {
    cashRecipt: Omit<CashReceipt, 'issueNumber'>
    cashReceiptApply: boolean
    firstPayMethod: PayMethod
    secondPayMethod: PayMethod
}

export interface PayMethod {
    corporationCode: string
    key: string
    payMethodType: string
}
