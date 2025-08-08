import { createSelector } from "@reduxjs/toolkit";
import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { call } from "redux-saga/effects";
import { get } from "lodash";
import { putSuccess } from "../utils";
import { FETCH_ENTITY } from "../consts";
import { infuse } from "modules/Core/utils/obj";

const defaultParseRes = (res) => res?.entity;
export default (
  moduleName,
  { requestHandler, parseRes = defaultParseRes, idKey = "id", ...args }
) =>
  initCell(moduleName, {
    name: FETCH_ENTITY,
    selector: (id) => (state) => state?.[moduleName]?.entities[id],
    selectField: (id, field) =>
      createSelector(
        (state) => state?.[moduleName]?.entities[id],
        (entity) => entity?.[field]
      ),
    selectNestedField: (id, path) =>
      createSelector(
        (state) => state?.[moduleName]?.entities[id],
        (entity) => get(entity, path)
      ),
    selectors: {
      getIsLoading: (state) => state.isLoading,
      getEntity: createSelector(
        (state) => state.entities,
        (entities, id) => {
          return entities?.[id];
        }
      ),
    },
    reducer: (state, payload) => {
      state.isLoading = true;
    },
    sagas: {
      latest: function* ({ payload }) {
        const id = payload?.[idKey];
        if (!id) return null;
        let res = yield call(requestHandler, { id });
        res = parseRes?.(res) ?? res;
        if (!res?.id) return null;
        yield putSuccess(moduleName, args?.name ?? FETCH_ENTITY, {
          overwrite: payload?.overwrite,
          ...res
        });
        return {
          overwrite: payload?.overwrite,
          ...res
        };
      },
    },
    successCell: {
      reducer: (state, { payload: _payload }) => {
        const { overwrite = false, ...payload } = _payload;
        state.isLoading = false;
        state.entities[payload.id] = overwrite ? payload : infuse(
          state.entities[payload.id],
          payload
        );
        state.focusedEntityId = payload?.id // doesn't this just make sense....
      },
    },
    ...args,
  });
