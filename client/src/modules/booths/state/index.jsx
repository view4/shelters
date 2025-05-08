import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { BOOTHS } from "../consts";
import { call } from "redux-saga/effects";
import middleware from "../middleware";

export default {
    fetchFocusedBooth: initCell(
        BOOTHS,
        {
            name: "fetchFocusedBooth",
            selector: (state) => state.focusedBooth,
            selectors: {
                id: (state) => state.focusedBooth?.id,
                isLoading: (state) => state.isLoading
            },
            reducer: (state, { payload }) => {
                state.isLoading = true
            },
            sagas: {
                latest: function* ({ payload }) {
                    const res = yield call(middleware.ops.fetchFocusedBooth);
                    return res?.focusedBooth
                },
                onCellSuccess: true
            },
            successCell: {
                reducer: (state, { payload }) => {
                    state.focusedBooth = payload
                    state.entities[payload.id] = payload
                    state.isLoading = false
                }
            }
        }
    ),
    fetchActiveBooths: initCell(
        BOOTHS,
        {
            name: "fetchActiveBooths",
            selector: (state) => state.activeBooths,
            selectors: {
                isLoading: (state) => state.isLoading
            },
            reducer: (state, { payload }) => {
                state.isLoading = true
            },
            sagas: {
                latest: function* ({ payload }) {
                    const res = yield call(middleware.ops.fetchActiveBooths);
                    return res?.activeBooths
                },
                onCellSuccess: true
            },
            successCell: {
                reducer: (state, { payload }) => {
                    state.activeBooths = payload.entities
                    state.isLoading = false
                }
            }
        }
    )
}