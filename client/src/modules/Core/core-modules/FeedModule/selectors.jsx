import { createSelector } from "@reduxjs/toolkit";
import { FEED_BATCH_SIZE } from "modules/Core/state/consts/feed";

export const selectFeed = (moduleName, nfk) => createSelector(
    state => nfk ? state[moduleName][nfk] : state[moduleName],
    feed => feed
);

export const selectFeedSegment = (moduleName, nfk) => createSelector(
    selectFeed(moduleName, nfk),
    feed => ([
        feed?.feedBookmark ?? 0,
        (feed?.feedBookmark ?? 0) + FEED_BATCH_SIZE
    ])
);

export const selectFeedParams = (moduleName, nfk) => createSelector(
    selectFeedSegment(moduleName, nfk),
    (segment) => ({ segment })
);

export const selectFeedFilters = (moduleName, nfk) => createSelector(
    selectFeed(moduleName, nfk),
    feed => feed?.filters ?? {}
);