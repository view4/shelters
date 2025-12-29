import { merge } from 'lodash';
import { arrayToObject } from 'modules/Core/utils/obj';
import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells';
import { selectFeedFilters, selectFeedParams } from 'modules/Core/core-modules/FeedModule/selectors';
import { unique } from 'modules/Core/utils/array';
import { call, select } from 'redux-saga/effects';
import { FEED_BATCH_SIZE } from '../consts/feed';
import { putSuccess } from '../utils';
import { FETCH_FEED } from '../consts';

const defaultParseRes = (res) => res?.feed ?? res;
export default (moduleName, { requestHandler, parseRes = defaultParseRes, batchSize = FEED_BATCH_SIZE, ...args }) => initCell(moduleName, {
    name: FETCH_FEED,
    selectors: {
        getIsLoading: (state) => state.feedIsLoading,
        getFeed: state => state?.stream?.map(id => state.entities[id]),
        getFeedHasMore: state => state?.feedCount > (state?.feedBookmark + batchSize),
        getFeedCount: state => state?.feedCount,
        getEntityCount: state => state?.stream?.length ?? 0,
    },
    reducer: (state, { payload }) => {
        state.feedIsLoading = true;
        if (payload?.segmentSize) {
            state.feedBookmark = state?.feedBookmark + payload?.segmentSize;
        }
        if(payload?.renewStream) {
            state.feedBookmark = 0;
        }
    },
    sagas: {
        latest: function* ({ payload }) {
            const feedParams = yield select(selectFeedParams(moduleName));
            const filters = yield select(selectFeedFilters(moduleName));
            const res = yield call(requestHandler, { ...filters, feedParams })
            yield putSuccess(moduleName, FETCH_FEED, { ...parseRes?.(res), renewStream: payload?.renewStream, renewEntities: payload?.renewEntities })
        }
    },
    successCell: {
        reducer: (state, { payload: { renewStream, renewEntities, ...payload } }) => {
            const newStreamIds = payload?.entities?.map?.(entity => entity.id) ?? []
            state.feedIsLoading = false;
            state.stream = renewStream ? newStreamIds : unique([
                ...state.stream,
                ...newStreamIds
            ]);
            state.entities = renewEntities ? arrayToObject(payload?.entities) : merge({}, state.entities, arrayToObject(payload?.entities))
            state.feedCount = payload?.info?.totalCount
        },
    },
    ...args
});