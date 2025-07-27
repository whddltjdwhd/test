import type {PointsReward} from '../types/domain/pointsReward'

type PointsRewardProps = PointsReward

export const PointsRewardComponent = (props: PointsRewardProps) => {
    const {maxReward, purchaseReward, adminReward, sellerReward, reviewReward} = props

    const totalReward = purchaseReward + adminReward + sellerReward + reviewReward

    return (
        <div className="points-reward">
            <h3>포인트 적립</h3>
            <div className="reward-info">
                <p>
                    <strong>최대 적립 가능:</strong> {maxReward.toLocaleString()}P
                </p>
                <p>
                    <strong>구매 적립:</strong> {purchaseReward.toLocaleString()}P
                </p>
                <p>
                    <strong>관리자 적립:</strong> {adminReward.toLocaleString()}P
                </p>
                <p>
                    <strong>판매자 적립:</strong> {sellerReward.toLocaleString()}P
                </p>
                <p>
                    <strong>리뷰 적립:</strong> {reviewReward.toLocaleString()}P
                </p>
                <hr />
                <p>
                    <strong>총 적립 예정:</strong> {totalReward.toLocaleString()}P
                </p>
            </div>
        </div>
    )
}
