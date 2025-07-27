import type {Period} from '../domain/orderDate'

export function periodTypeGuard(period: string): period is Period {
    return period === 'ONCE_PER_ONE_WEEK' || period === 'TWICE_PER_ONE_WEEK' || period === 'THREE_TIMES_PER_ONE_WEEK'
}
