import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { SABBATICALS } from "../consts";
import middleware from "../middleware";
import { call, put, select } from "redux-saga/effects";
import feed from "modules/cycles/state/feed";

export default {
    completeSabbatical: initCell(SABBATICALS, {
        name: "completeSabbatical",
        sagas: {
            latest: function* ({ payload }) {

                const result = yield call(
                    middleware.ops.completeSabbatical,
                    { startNewCycle: true }
                )

                const cycle = yield select(feed.cells.fetchEntity.selector);

                yield put(feed.cells.fetchEntity.action({
                    boothId: cycle?.boothId
                }));
                
                return result?.endSabbatical;
            }
        }
    })
}