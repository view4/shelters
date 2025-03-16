import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import middleware from "../middleware";
import { call, put } from "redux-saga/effects";
import { onError, onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";
import { MEMBERSHIP } from "../consts";

export default {
    cancelMembership: initCell(MEMBERSHIP, {
        name: "cancelMembership",
        sagas: {
            latest: function* () {
                const result = yield call(middleware.ops.cancel);
                if(!Boolean(result.cancelMembership)) return yield put(onError("Failed to cancel membership"));
                yield put(onSuccess("Membership cancelled"));
            }
        }
    }),
};
