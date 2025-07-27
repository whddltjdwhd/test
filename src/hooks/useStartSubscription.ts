import {useCallback} from 'react'

import {useAppDispatch, useAppSelector} from '../store'
import {selectDeliveryMemo, selectUseAllCoupon, selectUseVirtualPhoneNumber, selectReuseMemo} from '../store/selectors'
import {
    setDeliveryMemo,
    setUseAllCoupon,
    setUseVirtualPhoneNumber,
    setReuseMemo,
} from '../store/slices/client/startSubscriptionSlice'

import type {DeliveryMemo} from '../types/domain/delivery'

export function useStartSubscription() {
    const dispatch = useAppDispatch()

    // 상태 값들을 selector를 통해 가져옵니다.
    const deliveryMemo = useAppSelector(selectDeliveryMemo)
    const useAllCoupon = useAppSelector(selectUseAllCoupon)
    const useVirtualPhoneNumber = useAppSelector(selectUseVirtualPhoneNumber)
    const reuseMemo = useAppSelector(selectReuseMemo)

    // 각 상태를 업데이트하는 함수들을 useCallback으로 메모이즈합니다.
    const handleSetDeliveryMemo = useCallback(
        (memo: DeliveryMemo) => {
            dispatch(setDeliveryMemo(memo))
        },
        [dispatch],
    )

    const handleSetUseAllCoupon = useCallback(
        (value: boolean) => {
            dispatch(setUseAllCoupon(value))
        },
        [dispatch],
    )

    const handleSetUseVirtualPhoneNumber = useCallback(
        (value: boolean) => {
            dispatch(setUseVirtualPhoneNumber(value))
        },
        [dispatch],
    )

    const handleSetReuseMemo = useCallback(
        (value: boolean) => {
            dispatch(setReuseMemo(value))
        },
        [dispatch],
    )

    return {
        // 상태 값
        deliveryMemo,
        useAllCoupon,
        useVirtualPhoneNumber,
        reuseMemo,
        // 상태 변경 함수
        setDeliveryMemo: handleSetDeliveryMemo,
        setUseAllCoupon: handleSetUseAllCoupon,
        setUseVirtualPhoneNumber: handleSetUseVirtualPhoneNumber,
        setReuseMemo: handleSetReuseMemo,
    }
}
