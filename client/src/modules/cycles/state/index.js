import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import {  CYCLES } from "../consts";
import feed from "./feed";
import { call, put, select } from "redux-saga/effects";
import middleware from "../middleware";
import { onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";

export default {
  addGatewayToActiveCycle: initCell(CYCLES, {
    name: "addGatewayToActiveCycle",
    sagas: {
      latest: function* ({ payload: { gatewayId, orderKey } }) {
        const cycle = yield select(feed.cells.fetchEntity.selector);

        if(!orderKey) {
          const res = yield call(middleware.ops.addGatewayToCycle, {gatewayId});
          if(res.error) throw new Error(res.error);
        } else {
          if(cycle[orderKey]) throw new Error("Gateway already exists in this cycle");
          const payload = {};
          payload[orderKey] = gatewayId;
          yield put(
            feed.cells.createEntity.action({ input: payload, id: cycle.id })
          );
        }
        yield put(onSuccess("Gateway added to cycle" ));
        yield put(feed.cells.fetchEntity.action({ boothId: cycle?.boothId }));
      },
    },
  }),
  reorderCycleGateway: initCell(CYCLES, {
    name: "reorderCycleGateway",
    sagas: {
      latest: function* ({ payload: { orderKey, newOrderKey } }) {
        const cycle = yield select(feed.cells.fetchEntity.selector);
        const payload = {
          [orderKey]: cycle[newOrderKey]?.id || null,
          [newOrderKey]: cycle[orderKey]?.id || null,
        };
        yield put(
          feed.cells.createEntity.action({ input: payload, id: cycle.id })
        );
        yield put(feed.cells.fetchEntity.action({ boothId: cycle?.boothId }));
      },
    },
  }),
  removeGatewayFromActiveCycle: initCell(CYCLES, {
    name: "removeGatewayFromActiveCycle",
    sagas: {
      latest: function* ({ payload: { orderKey } }) {
        const cycle = yield select(feed.cells.fetchEntity.selector);
        const payload = {
          [orderKey]: null,
        };
        yield put(
          feed.cells.createEntity.action({ input: payload, id: cycle.id })
        );
        yield put(feed.cells.fetchEntity.action({ boothId: cycle?.boothId }));
      },
    },
  }),
};
