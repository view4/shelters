import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { ADMIN } from "../consts";
import { call } from "redux-saga/effects";
import middleware from "../middleware";

export default {
    stampInvitationApplication: initCell(
        ADMIN,
        {
            name: "stampInvitationApplication",
            sagas: {
                latest: function* ({ payload: { id, key } }) {
                    const res = yield call(middleware.ops.stampInvitationApplication, { id, key });
                    return res;
                },
            },
        }
    ),
    syncSubscriptionPayments: initCell(
        ADMIN,
        {
            name: "syncSubscriptionPayments",
            selectors: {
                isLoading: (state) => state.isLoading,
            },
            reducer: (state) => {
                state.isLoading = true;
            },
            sagas: {
                latest: function* ({ payload: { userId } }) {
                    const res = yield call(middleware.ops.syncSubscriptionPayments, { userId });
                    return res;
                },
                onCellSuccess: true,
            },
            successCell: {
                reducer: (state) => {
                    state.isLoading = false;
                }
            },
        }
    ),
};

