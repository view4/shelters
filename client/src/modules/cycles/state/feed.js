import { compact } from 'lodash'
import { put } from 'redux-saga/effects'
import { createSelector } from "@reduxjs/toolkit";
import FeedModule from "modules/Core/core-modules/FeedModule";
import { CYCLES } from "../consts";
import middleware from "../middleware";
import state from 'modules/roadmaps/state/index'


const extractGateways = cycle => {
  return compact([
    cycle?.a,
    cycle?.b,
    cycle?.c,
    cycle?.d,
    cycle?.e,
    cycle?.f,
    cycle?.sabbatical?.gateway,
  ])
}

export default new FeedModule({
  name: CYCLES,
  cellOptions: {
    createEntityCell: {
      // UPDATE HANDLING HERE RE: flattening gateways (altnerative is to fetch by ids)
      requestHandler: middleware.ops.create,
      onSuccess: function* ({ payload }) {
        const entities = extractGateways(payload);
        yield put(state.setEntities.action(entities));
      }

    },
    fetchFeedCell: {
      // UPDATE HANDLING HERE RE: flattening gateways (alternave is to fetch by ids)
      requestHandler: middleware.ops.fetchFeed,
    },
    fetchEntityCell: {
      requestHandler: middleware.ops.fetchEntity,
      idKey: "boothId",
      successCell: {
        reducer: (state, action) => {
          state.isLoading = false;
          state.cycle = action.payload;
        },
      },
      parseRes: res => res?.currentCycle,
      selector: createSelector(
        (state) => state[CYCLES]?.cycle,
        (cycle) => cycle
      ),
      selectGateway: (orderKey) => createSelector(
        (state) => state[CYCLES]?.cycle,
        (cycle) => cycle[orderKey]
      )
    },
  },
});
