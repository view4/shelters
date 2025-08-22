import { compact } from 'lodash'
import FeedModule from "modules/Core/core-modules/FeedModule";
import { CYCLES } from "../consts";
import middleware from "../middleware";
import { call, put, select } from 'redux-saga/effects';
import roadmapsState from 'modules/roadmaps/state';
import { selectFeedFilters, selectFeedParams } from 'modules/Core/core-modules/FeedModule/selectors';
import { FETCH_FEED } from 'modules/Core/state/consts';
import { putSuccess } from 'modules/Core/state/utils';

export const extractGateways = cycle => {
  // TODO: extract children here...
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
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
      sagas: {
        latest: function* ({ payload }) {
          const feedParams = yield select(selectFeedParams(CYCLES));
          const filters = yield select(selectFeedFilters(CYCLES));
          const result = yield call(middleware.ops.fetchFeed, { ...filters, feedParams });
          const cycleGateways = result?.feed?.entities?.reduce((gateways, cycle) => ([
            ...gateways,
            ...extractGateways(cycle)
          ]), []);
          yield put(roadmapsState.setEntities.action(cycleGateways));
          yield putSuccess(CYCLES, FETCH_FEED, { ...result?.feed, renewStream: payload?.renewStream, renewEntities: payload?.renewEntities })
        }
      }
    },
  },
});
