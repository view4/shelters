import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { FEATURES } from "../consts";

const FEATURE_FRAGMENT = `
    id
    name
    text
    stamps {
        commenced
        prospective
        committed
        commenced
        deployed
        accepted
    }
    currentStamp {
        key
        value
    }
    boothId
    user
    createdAt
    updatedAt
    comments {
        id
        text
        user
        createdAt
        updatedAt
    }
    votes {
        id
        text
        score
        user
        createdAt
        updatedAt
    }
    labels {
        featureId
        labelId
        user
        name
        id
    }
    children {
        id
        name
        text
        currentStamp {
            key
            value
        }
    }
`;

export default new MiddlewareModule({
    name: FEATURES,
    operations: {
        create: `
            mutation upsertFeature($input: FeatureInput, $id: String) {
                upsertFeature(input: $input, id: $id) {
                    id
                }
            }
        `,
        fetchFeed: `
            query features($boothId: String) {
                feed: features(boothId: $boothId) {
                    entities {
                        id 
                        name
                        text
                        currentStamp {
                            key
                            value
                        }
                    }
                    info {
                        totalCount
                    }
                }
            }
        `,
        fetchEntity: `
            query feature($id: ID!) {
                entity: feature(id: $id) {
                    ${FEATURE_FRAGMENT}
                }
            }
        `,
        upsertVote: `
            mutation upsertFeatureVote($input: FeatureVoteInput, $id: String) {
                upsertFeatureVote(input: $input, id: $id) {
                    id
                }
            }
        `,
        stampEntity: `
            mutation stampFeature($id: String, $key: String) {
                stampFeature(id: $id, key: $key) {
                    id
                }
            }
        `,
        upsertComment: `
            mutation upsertFeatureComment($input: FeatureCommentInput, $id: String) {
                upsertFeatureComment(input: $input, id: $id) {
                    id
                }
            }
        `,
        addFeatureLabel: `
            mutation addFeatureLabel($input: FeatureLabelInput) {
                addFeatureLabel(input: $input) {
                    id
                }
            }
        `,
        removeFeatureLabel: `
            mutation removeFeatureLabel($featureLabelId: String) {
                removeFeatureLabel(featureLabelId: $featureLabelId)
            }
        `,
        fetchBoothLabels: `
            query boothLabels($boothId: String!) {
                boothLabels(boothId: $boothId) {
                    id
                    name
                }
            }
        `
    }
}); 