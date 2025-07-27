import {deliveryFeeClassTypeGuard} from '../../../types/guard/delivery'
import {periodTypeGuard} from '../../../types/guard/orderDate'
import {issueTypeGuard, usageGuard} from '../../../types/guard/paymentMethod'
import {defaultMemos} from '../intial/delivery'
import ORIGINAL_ORDER_DATA from '../response/orderSheetData.json'

import type {ErrorType} from '../../../errorBase'
import type {DeliveryAddress, DeliveryMemo} from '../../../types/domain/delivery'
import type {SubscriptionDate} from '../../../types/domain/orderDate'
import type {OrderPayMethod, OrderPayMethodInfo} from '../../../types/domain/paymentMethod'
import type {OrderProduct} from '../../../types/domain/product'

type OrderSheetOrginData = typeof ORIGINAL_ORDER_DATA
const orderSheetData: OrderSheetOrginData = ORIGINAL_ORDER_DATA

const MOCK_ORDER_SHEET_ITME_ID = 2025072016356181
const MOCK_DELIVERY_KEY = 2025072085615773

interface OrderDB {
    getsubscriptionDate: () => SubscriptionDate | ErrorType
    getDeliveryAddress: () => DeliveryAddress
    getOrderProduct: () => OrderProduct | ErrorType
    getOrderPayMethod: () => OrderPayMethod | ErrorType
}

export const ORDER_DB: OrderDB = {
    getsubscriptionDate() {
        const subscription = orderSheetData.result.subscriptionViewResult.subscription
        const {firstDeliveryDate, firstPaymentDate, periodCount} = subscription

        const periodType = subscription.periodType
        if (!periodTypeGuard(periodType)) {
            return 'typeError'
        }

        return {
            firstDeliveryDate,
            firstPaymentDate,
            periodCount,
            periodType,
        }
    },
    getDeliveryAddress() {
        const deliveryAddress = orderSheetData.result.subscriptionViewResult.deliveryAddressBook.defaultDeliveryAddress
        const {receiverName, addressName, telNo1, telNo2} = deliveryAddress
        const address = deliveryAddress.baseAddress + deliveryAddress.detailAddress + deliveryAddress.zipCode
        const recentDeliveryMemo =
            orderSheetData.result.subscriptionViewResult.deliveryAddressBook.recentUsedDeliveryMemosReuse
        const deliveryMemo: DeliveryMemo[] = [...defaultMemos, ...recentDeliveryMemo]

        return {
            receiverName,
            addressName,
            telNo1,
            telNo2,
            address,
            deliveryMemo,
        }
    },
    getOrderProduct() {
        const {subscription, products, delivery} = orderSheetData.result.subscriptionViewResult
        const deliveryPolicy = delivery.deliveryGroupsByKey[MOCK_DELIVERY_KEY].deliveryPolicy.deliveryFeeClassType
        if (!deliveryFeeClassTypeGuard(deliveryPolicy)) {
            return 'typeError'
        }

        if (!products.length || !products[0]) {
            return 'referenceError'
        }

        const product = products[0]

        const merchantChannelName = product.merchantChannelName
        const productName = product.productName
        const quantity = product.items.reduce((acc, item) => acc + item.quantity, 0)
        const orderAmount = product.items.reduce((acc, item) => acc + item.orderAmount, 0)
        const deliveryFee = delivery.totalOrderDeliveryFee

        const subscriptionDiscountedAmount =
            subscription.subscriptionDiscountListsByOrderSheetItemId[MOCK_ORDER_SHEET_ITME_ID][0]!.discountAmount
        const discountAmount =
            orderSheetData.result.subscriptionViewResult.coupon.discountsByItemId[MOCK_ORDER_SHEET_ITME_ID][0]!
                .discountAmount
        const totalOrderAmount = orderAmount + deliveryFee - discountAmount

        return {
            merchantChannelName,
            deliveryPolicy,
            productName,
            quantity,
            subscriptionDiscountedAmount,
            orderAmount,
            totalOrderAmount,
        }
    },
    getOrderPayMethod() {
        const paymentMethod = orderSheetData.result.paymentMethodsResult
        const {usePointAll, firstPayMethod, secondPayMethod, cashReceiptApply} = paymentMethod

        const payMethods: OrderPayMethodInfo[] = [firstPayMethod, secondPayMethod]

        const {issueType, usageType} = paymentMethod.cashReceipt
        if (!issueTypeGuard(issueType) || !usageGuard(usageType)) {
            return 'typeError'
        }

        const cashReceipt = {
            ...paymentMethod.cashReceipt,
            issueType,
            usageType,
        }

        return {
            usePointAll,
            payMethods,
            cashReceiptApply,
            cashReceipt,
        }
    },
}
