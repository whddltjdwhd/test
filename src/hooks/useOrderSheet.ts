import {useAppSelector} from '../store'
import {selectOrderSheetData, selectOrderSheetLoading, selectOrderSheetError} from '../store/selectors'

export function useOrderSheet() {
    const data = useAppSelector(selectOrderSheetData)
    const loading = useAppSelector(selectOrderSheetLoading)
    const error = useAppSelector(selectOrderSheetError)

    return {
        data,
        loading,
        error,
    }
}
