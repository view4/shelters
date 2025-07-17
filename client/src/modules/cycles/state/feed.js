import { compact } from 'lodash'
import { put } from 'redux-saga/effects'
import { createSelector } from "@reduxjs/toolkit";
import FeedModule from "modules/Core/core-modules/FeedModule";
import { CYCLES } from "../consts";
import middleware from "../middleware";
import roadmapsState from 'modules/roadmaps/state/index'

export const extractGateways = cycle => {
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
      // successCell: {
      //   reducer: (state, action) => {
      //     const entities = extractGateways(action.payload);
      //     state.entities = merge({}, state.entities, arrayToObject(entities));
      //   },
      // },
    },
    fetchFeedCell: {
      // UPDATE HANDLING HERE RE: flattening gateways (alternave is to fetch by ids)
      requestHandler: middleware.ops.fetchFeed,
    },
    // fetchEntityCell: {
    //   requestHandler: middleware.ops.fetchEntity,
    //   idKey: "boothId",
    //   successCell: {
    //     reducer: (state, action) => {
    //       state.isLoading = false;
    //       state.cycle = action.payload;
    //     },
    //     sagas: {
    //       latest: function* ({ payload }) {
    //         console.log('on success saga being called here...')
    //         console.log("payload", payload)
    //         const entities = extractGateways(payload);
    //         yield put(roadmapsState.setEntities.action(entities));
    //       }
    //     },
    //     onCellSuccess: function* ({ payload }) {
    //       console.log('on cell success saga being called here...')
    //       console.log("payload", payload)
    //       const entities = extractGateways(payload);
    //       yield put(roadmapsState.setEntities.action(entities));
    //     }
    //   },
    //   onCellSuccess: true,
    //   parseRes: res => res?.currentCycle,
    //   selector: createSelector(
    //     (state) => state[CYCLES]?.cycle,
    //     (cycle) => cycle
    //   ),
    //   selectGateway: (orderKey) => createSelector(
    //     (state) => state[CYCLES]?.cycle,
    //     (cycle) => cycle[orderKey]
    //   )
    // },
  },
});
