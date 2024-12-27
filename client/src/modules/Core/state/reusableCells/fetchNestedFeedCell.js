import { merge } from 'lodash';
import { arrayToObject } from 'modules/Core/utils/obj';
import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells';
import { selectFeedFilters, selectFeedParams } from 'modules/Core/core-modules/FeedModule/selectors';
import { unique } from 'modules/Core/utils/array';
import { call, select } from 'redux-saga/effects';
import { FEED_BATCH_SIZE, INITIAL_FEED_STATE } from '../consts/feed';
import { putSuccess } from '../utils';
import { FETCH_NESTED_FEED } from '../consts';

const defaultParseRes = (res) => res?.feed ?? res;
export default (moduleName, { requestHandler, parseRes = defaultParseRes, batchSize = FEED_BATCH_SIZE, nestedFeedKey, nfk = nestedFeedKey, ...args }) => initCell(moduleName, {
    name: FETCH_NESTED_FEED + `/${nfk}`,
    selectors: {
        getIsLoading: (state) => state[nfk]?.feedIsLoading,
        getFeed: state => state[nfk]?.stream?.map(id => state.entities[id]),
        getFeedHasMore: state => state[nfk]?.feedCount > (state[nfk]?.feedBookmark + batchSize),
        getFeedCount: state => state[nfk]?.feedCount,
    },
    reducer: (state, { payload }) => {
        if (!state[nfk]) {
            state[nfk] = {
                ...INITIAL_FEED_STATE,
            }
        }
        if (payload?.segmentSize) {
            state[nfk].feedBookmark = state[nfk]?.feedBookmark + payload[nfk]?.segmentSize;
        }
    },
    sagas: {
        latest: function* ({ payload }) {
            const feedParams = yield select(selectFeedParams(moduleName, nfk));
            const filters = yield select(selectFeedFilters(moduleName, nfk));
            const res = yield call(requestHandler, { ...filters, feedParams })
            yield putSuccess(
                moduleName,
                FETCH_NESTED_FEED + `/${nfk}`,
                {
                    ...parseRes?.(res),
                    renewStream: payload?.renewStream,
                    renewEntities: payload?.renewEntities
                }
            )
        }
    },
    successCell: {
        reducer: (state, { payload: { renewStream, renewEntities, ...payload } }) => {
            const newStreamIds = payload?.entities?.map?.(entity => entity.id) ?? []
            state[nfk].feedIsLoading = false;
            state[nfk].stream = renewStream ? newStreamIds : unique([
                ...state[nfk].stream,
                ...newStreamIds
            ]);
            state.entities = renewEntities ? arrayToObject(payload?.entities) : merge({}, state.entities, arrayToObject(payload?.entities))
            state[nfk].feedCount = payload?.info?.totalCount
        },
    },
    ...args
});