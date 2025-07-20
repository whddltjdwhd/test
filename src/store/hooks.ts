import {useDispatch, useSelector} from 'react-redux'

import type {AppDispatch, RootState} from './index'
import type {TypedUseSelectorHook} from 'react-redux'

// 타입이 지정된 useSelector와 useDispatch hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
