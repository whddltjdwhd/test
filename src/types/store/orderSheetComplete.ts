// 단일 API 방식의 Redux 상태 타입

import type {OrderSheetCompleteResponse} from '../api/response'

// 단순화된 UI 상태 타입
export interface OrderSheetCompleteState {
    data: OrderSheetCompleteResponse | null
    loading: boolean
    error: string | null
}
