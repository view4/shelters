import FeedModule from "modules/Core/core-modules/FeedModule";
import { CYCLES } from "../consts";
import middleware from "../middleware";
import { createSelector } from "@reduxjs/toolkit";


export default new FeedModule({
  name: CYCLES,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
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
