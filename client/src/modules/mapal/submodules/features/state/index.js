import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { FEATURES } from "../consts";
import feed from "./feed";
import { call, put } from "redux-saga/effects";
import middleware from "../middleware";
import { onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";

export default {
    upsertFeatureVote: initCell(FEATURES, {
        name: "upsertFeatureVote",
        sagas: {
            latest: function* ({ payload: { input, id } }) {
                const result = yield call(middleware.ops.upsertVote, { input, id });
                if (!result.upsertFeatureVote.id) {
                    throw new Error("Failed to upsert feature vote");
                }
                yield put(onSuccess("Vote added"));
                yield put(feed.cells.fetchEntity.action({ id: input.featureId }));
                return result.upsertFeatureVote;
            }
        }
    }),
    upsertFeatureComment: initCell(FEATURES, {
        name: "upsertFeatureComment",
        sagas: {
            latest: function* ({ payload: { input, id } }) {
                const result = yield call(middleware.ops.upsertComment, { input, id });
                if (!result.upsertFeatureComment.id) {
                    throw new Error("Failed to upsert feature comment");
                }
                yield put(onSuccess("Comment added"));
                yield put(feed.cells.fetchEntity.action({ id: input.featureId }));
                return result.upsertFeatureComment;
            }
        }
    })
};
