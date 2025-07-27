import ORIGINAL_POINTS_REWARD_DATA from '../response/rewardPointsData.json'

import type {PointsReward} from '../../../types/domain/pointsReward'

type PointsRewardOriginData = typeof ORIGINAL_POINTS_REWARD_DATA
const pointsRewardData: PointsRewardOriginData = ORIGINAL_POINTS_REWARD_DATA

interface PointsRewardDB {
    getPointsReward: () => PointsReward
}

const POINTS_REWARD_DB: PointsRewardDB = {
    getPointsReward() {
        const {purchaseRewardPointsByItemId, reviewRewardPointsByItemId} = pointsRewardData.result
        const {admin: adminReward, seller: sellerReward} = purchaseRewardPointsByItemId[2025072744568572]

        const purchaseReward = adminReward + sellerReward
        const reviewReward = reviewRewardPointsByItemId[2025072744568572].maxRewardPoint
        const maxReward = purchaseReward + reviewReward

        return {
            maxReward,
            purchaseReward,
            adminReward,
            sellerReward,
            reviewReward,
        }
    },
}

export default POINTS_REWARD_DB
