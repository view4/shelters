import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { call } from "redux-saga/effects";
import { STAMP_ENTITY } from "../consts";

const defaultParseRes = (res) => res?.entity?.stamps;
export default (
  moduleName,
  { requestHandler, parseRes = defaultParseRes, idKey = "id", ...args }
) =>
  initCell(moduleName, {
    name: STAMP_ENTITY,
    selector: (id) => (state) => state?.[moduleName]?.entities?.[id]?.stamps,
    reducer: (state, payload) => {
      state.isLoading = true;
    },
    sagas: {
      latest: function* ({ payload }) {
        const id = payload?.[idKey];
        if (!id) return null;
        let res = yield call(requestHandler, { id, key: payload.key });
        const stamps = parseRes?.(res) ?? res;
        return {
          id,
          stamps,
        };
      },
    },
    successCell: {
      reducer: (state, { payload }) => {
        state.isLoading = false;
        state.entities[payload.id].stamps = payload?.stamps;
      },
    },
    ...args,
  });
