import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { CYCLE_GATEWAY_KEYS, CYCLES } from "../consts";
import feed from "./feed";
import { put, select } from "redux-saga/effects";

export default {
  addGatewayToActiveCycle: initCell(CYCLES, {
    name: "addGatewayToActiveCycle",
    sagas: {
      latest: function* ({ payload: { gatewayId, orderKey } }) {
        console.log("GATEWAY ID: ", gatewayId, orderKey);
        const cycle = yield select(feed.cells.fetchEntity.selector);
        let isPlaced = false;
        const payload = {};
        if (Boolean(orderKey) && !cycle[orderKey]) {
          console.log("inside here...");
          payload[orderKey] = gatewayId;
          isPlaced = true;
        }
        for (let key of CYCLE_GATEWAY_KEYS) {
          if (!cycle[key] && !isPlaced) {
            payload[key] = gatewayId;
            isPlaced = true;
          } else if (Boolean(cycle[key])) {
            payload[key] = cycle[key]?.id;
          }
        }
        yield put(
          feed.cells.createEntity.action({ input: payload, id: cycle.id })
        );
        yield put(feed.cells.fetchEntity.action({ boothId: cycle?.boothId }));

        console.log("PAYLOAD: ", payload);
        console.log(cycle);
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
        console.log({ payload });
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
        console.log({ payload });
      },
    },
  }),
};
