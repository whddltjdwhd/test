import type {OrderProduct} from '../types/domain/product'

type OrderProductProps = OrderProduct

export const OrderProductComponent = (props: OrderProductProps) => {
    const {
        merchantChannelName,
        deliveryPolicy,
        productName,
        quantity,
        subscriptionDiscountedAmount,
        orderAmount,
        totalOrderAmount,
    } = props

    return (
        <div className="order-product">
            <h3>주문 상품</h3>
            <div className="product-info">
                <p>
                    <strong>판매자:</strong> {merchantChannelName}
                </p>
                <p>
                    <strong>상품명:</strong> {productName}
                </p>
                <p>
                    <strong>수량:</strong> {quantity}개
                </p>
                <p>
                    <strong>배송비 정책:</strong> {deliveryPolicy === 'FREE' ? '무료배송' : '유료배송'}
                </p>
                <p>
                    <strong>구독 할인 금액:</strong> {subscriptionDiscountedAmount.toLocaleString()}원
                </p>
                <p>
                    <strong>주문 금액:</strong> {orderAmount.toLocaleString()}원
                </p>
                <p>
                    <strong>총 주문 금액:</strong> {totalOrderAmount.toLocaleString()}원
                </p>
            </div>
        </div>
    )
}
