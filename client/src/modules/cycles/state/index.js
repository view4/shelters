import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { CYCLES } from "../consts";
import feed, { extractGateways } from "./feed";
import { call, put, select } from "redux-saga/effects";
import middleware from "../middleware";
import { onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";
import roadmapsState from "modules/roadmaps/state";
import { createSelector } from "@reduxjs/toolkit";
import { FETCH_ENTITY } from "modules/Core/state/consts";

const fetchCurrentCycleCell = initCell(CYCLES, {
  name: "fetchCurrentCycle",
  reducer: (state, { payload }) => {
    state.isLoading = true;
  },
  selectors: {
    activeCycle: createSelector(
      (state) => ({ entities: state.entities, activeCycleId: state.activeCycleId }),
      ({ entities, activeCycleId }) => {
        return entities[activeCycleId]
      }
    ),
    cycle: createSelector(
      (state) => state.entities,
      (entities, id) => entities[id]
    ),
    isLoading: (state) => state.isLoading,
  },
  sagas: {
    latest: function* ({ payload: { boothId } }) {
      const result = yield call(middleware.ops.fetchCurrentcycle, { boothId });
      if (!result.currentCycle.id) throw new Error("Failed to fetch cycle");
      const cycleGateways = extractGateways(result.currentCycle);
      yield put(roadmapsState.setEntities.action(cycleGateways));
      return result.currentCycle;
    },
    onCellSuccess: true
  },
  successCell: {
    reducer: (state, { payload }) => {
      state.isLoading = false;
      state.entities[payload.id] = payload;
      state.activeCycleId = payload.id; //TODO: change if able to focus on single cell differently
    },
  },
});

const addGatewayToActiveCycle = initCell(CYCLES, {
  name: "addGatewayToActiveCycle",
  sagas: {
    latest: function* ({ payload: { gatewayId, orderKey } }) {
      const cycle = yield select(fetchCurrentCycleCell.selectors.activeCycle);

      if (!orderKey) {
        const res = yield call(middleware.ops.addGatewayToCycle, { gatewayId });
        if (res.error) throw new Error(res.error);
      } else {
        if (cycle[orderKey])
          throw new Error("Step already exists in this cycle");
        const payload = {};
        payload[orderKey] = gatewayId;
        yield put(
          feed.cells.createEntity.action({ input: payload, id: cycle.id })
        );
      }
      yield put(onSuccess("Step added to cycle"));
      yield put(fetchCurrentCycleCell.action({ boothId: cycle?.boothId }));
    },
    onCellSuccess: true
  },
});

export default {
  addGatewayToActiveCycle,
  addGatewayToCycle: initCell(CYCLES, {
    name: "addGatewayToCycle",
    sagas: {
      latest: function* ({ payload: { gatewayId, cycleId, orderKey } }) {
        if (!cycleId)
          return yield put(
            addGatewayToActiveCycle.action({ gatewayId, orderKey })
          );
        const payload = {};
        payload[orderKey] = gatewayId;
        yield put(
          feed.cells.createEntity.action({
            input: { [orderKey]: gatewayId },
            id: cycleId,
          })
        );
        yield put(onSuccess("Step added to cycle"));
      },
    },
  }),
  reorderCycleGateway: initCell(CYCLES, {
    name: "reorderCycleGateway",
    sagas: {
      latest: function* ({ payload: { orderKey, newOrderKey, cycleId } }) {
        const cycle = yield select(feed.cells.fetchEntity.selector(cycleId));
        const payload = {
          [orderKey]: cycle[newOrderKey]?.id || null,
          [newOrderKey]: cycle[orderKey]?.id || null,
        };
        yield put(
          feed.cells.createEntity.action({ input: payload, id: cycleId })
        );
        yield put({
          type: CYCLES + "/" + FETCH_ENTITY,
          payload: { id: cycleId }
        })
      },
    },
  }),
  removeGatewayFromActiveCycle: initCell(CYCLES, {
    name: "removeGatewayFromActiveCycle",
    sagas: {
      latest: function* ({ payload: { orderKey, cycleId } }) {
        const payload = {
          [orderKey]: null,
        };
        yield put(
          feed.cells.createEntity.action({ input: payload, id: cycleId })
        );

        yield put({
          type: CYCLES + "/" + FETCH_ENTITY,
          payload: { id: cycleId }
        })

      },
    },
  }),
  focusCycle: initCell(CYCLES, {
    name: "focusCycle",
    sagas: {
      latest: function* ({ payload: { id } }) {
        const result = yield call(middleware.ops.focusCycle, { id });
        if (!result.focusCycle.id) {
          throw new Error("Failed to focus cycle");
        }
        return result.focusCycle.id;
      },
    },
  }),
  fetchCurrentCycle: fetchCurrentCycleCell,
  completeCycle: initCell(CYCLES, {
    name: "completeCycle",
    sagas: {
      latest: function* ({ payload: { id } }) {
        const result = yield call(middleware.ops.completeCycle, { id });
        if (!result.completeCycle.id) throw new Error("Failed to complete cycle");
        return result.completeCycle.id;
      },
    },
  }),
};
