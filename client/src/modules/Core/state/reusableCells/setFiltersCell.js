import { delay, put } from "redux-saga/effects";
import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { FETCH_FEED, SET_FILTERS } from "../consts";

export default (moduleName, { onErrorMessage }) =>
  initCell(moduleName, {
    name: SET_FILTERS,
    selectors: {
      getFilters: (state) => state.filters,
    },
    reducer: (state, { payload }) => {
      const { reset, shouldRefetch, ...filters } = payload;
      console.log("being called...", filters, reset)
      state.filters = {
        ...(!reset && state.filters),
        ...filters,
      };
    },
    sagas: {
      latest: function* ({ payload }) {
        if (!payload.shouldRefetch) return;
        yield delay(900);
        yield put({
          type: moduleName + "/" + FETCH_FEED,
          payload: { renewStream: true },
        });
      },
    },
  });
