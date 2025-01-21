import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { REMOVE_ENTITY } from "../consts";
import { call } from "redux-saga/effects";
const defaultParseRes = (res) => Boolean(res);

export default (
  moduleName,
  { requestHandler, idKey = "id", parseRes = defaultParseRes }
) =>
  initCell(moduleName, {
    name: REMOVE_ENTITY,
    reducer: (state, { payload }) => {
      state.isLoading = true;
    },
    sagas: {
      latest: function* ({ payload }) {
        const id = payload?.[idKey];
        if (!id) return null;
        let res = yield call(requestHandler, {id});
        return parseRes?.(res) ?? res;
      },
      onCellSuccess: true,
    },
    successCell: {
      reducer: (state, { payload }) => {
        state.isLoading = false;
        //   remove entity from the state ?
      },
    },
  });
