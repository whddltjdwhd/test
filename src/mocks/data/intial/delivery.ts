import type {DeliveryMemo} from '../../../types/domain/delivery'

export const defaultMemos: DeliveryMemo[] = [
    {
        memo: '배송  메모를 선택해주세요',
        memoSeq: 0,
        reuseMemo: false,
        template: false,
    },
    {
        memo: '직접 입력할래요',
        memoSeq: 0,
        reuseMemo: false,
        template: false,
    },
]
