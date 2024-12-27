import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { BOOTHS } from "../consts";
import { call } from "redux-saga/effects";
import middleware from "../middleware";

export default {
    fetchActiveBooth: initCell(
        BOOTHS,
        {
            name: "fetchActiveBooth",
            selector: (state) => state.activeBooth,
            selectors: {
                id: (state) => state.activeBooth?.id
            },
            sagas: {
                latest: function* ({ payload }) {
                    const res = yield call(middleware.ops.fetchActiveBooth);
                    console.log(res)
                    return res?.activeBooth

                },
                onCellSuccess: true
            },
            successCell: {
                reducer: (state, { payload }) => {
                    state.activeBooth = payload
                    state.entities[payload.id] = payload    
                }
            }

        }
    )
}