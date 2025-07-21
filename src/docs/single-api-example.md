// === Single API 방식 구현 예시 ===

// API Endpoint
export const API_ENDPOINTS = {
ORDER_SHEET: {
// 기존 개별 엔드포인트들 제거하고
COMPLETE: '/orderSheet/complete', // 모든 데이터를 한번에
// 또는 쿼리 파라미터 방식
BASE: '/orderSheet', // ?include=subscription,delivery,product,payment,points,memo
},
} as const

// 통합 타입 정의
export interface OrderSheetCompleteResponse {
subscriptionDate: SubscriptionDate
deliveryAddress: DeliveryAddress
orderProduct: OrderProduct
orderPayMethod: OrderPayMethod
pointsReward: PointsReward
}

// Redux Thunk - 단일 API 호출
export const fetchOrderSheetComplete = createAsyncThunk(
'orderSheet/fetchComplete',
async (\_, {rejectWithValue}) => {
try {
const response = await apiClient.get<OrderSheetCompleteResponse>(
API_ENDPOINTS.ORDER_SHEET.COMPLETE
)
return response.data
} catch (error) {
const axiosError = error as AxiosError
return rejectWithValue(axiosError.response?.data || axiosError.message)
}
},
)

// MSW Handler - 단일 응답
http.get(createApiUrl(API_ENDPOINTS.ORDER_SHEET.COMPLETE), () => {
return HttpResponse.json({
subscriptionDate: mockDB.getSubscriptionDate(),
deliveryAddress: mockDB.getDeliveryAddress(),
orderProduct: mockDB.getOrderProduct(),
orderPayMethod: mockDB.getOrderPayMethod(),
pointsReward: mockDB.getPointsReward(),
deliveryMemoOptions: mockDB.getDeliveryMemoOptions(),
})
}),

// Redux State - 단순화된 로딩 상태
const initialState: OrderSheetState = {
data: null, // 모든 데이터를 하나의 객체로
loading: false, // 단일 로딩 상태
error: null, // 단일 에러 상태
}

// Component - 단순화된 사용
useEffect(() => {
dispatch(fetchOrderSheetComplete())
}, [dispatch])

// 성능 측정
const start = performance.now()
await dispatch(fetchOrderSheetComplete())
const end = performance.now()
console.log(`로딩 시간: ${end - start}ms`)
