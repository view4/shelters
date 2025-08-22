import FeedModule from "modules/Core/core-modules/FeedModule";
import { unique } from 'modules/Core/utils/array';
import { arrayToObject, compactObject } from 'modules/Core/utils/obj';
import { merge } from 'lodash';
import { ROADMAPS } from "../consts";
import middleware from "../middleware";

export const flatten = entity => compactObject({
  ...entity,
  children: null,
  childrenIds: entity?.children?.map((c) => c.id)
})

export const processEntities = (entities = []) => {
  return entities.reduce((entities, entity) => ([
    ...entities,
    ...flattenGateways(entity)
  ]), []).map(flatten)
};

// recursive flattening of entities/children, return an array of all gateways, processing infinitely if there is children.
const flattenGateways = (entity) => {
  if (!entity?.children?.length) return [entity];
  return entity?.children?.reduce((flattened, child) => ([
    ...flattened,
    ...flattenGateways(child)
  ]), [entity])
}

export default new FeedModule({
  name: ROADMAPS,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
      successCell: {
        // TODO: decide whether to allow a new param like additionalOnSucccessStateReduction kinda thing or, maybe to have the success as a separate fcuntion and then to call from there.. :) 
        // I think second option is good for now... 
        reducer: (state, { payload: { renewStream, renewEntities, ...payload } }) => {
          const newStreamIds = payload?.entities?.map(entity => entity.id) ?? []
          const entities = processEntities(payload?.entities)
          state.feedIsLoading = false;
          state.stream = renewStream ? newStreamIds : unique([
            ...state.stream,
            ...newStreamIds
          ]);
          state.entities = renewEntities ? arrayToObject(entities) : merge({}, state.entities, arrayToObject(entities))
          state.feedCount = payload?.info?.totalCount

        },
      }
    },
    fetchEntityCell: {
      requestHandler: middleware.ops.fetchEntity,
      successCell: {
        reducer: (state, { payload: { overwrite, ...entity } }) => {
          state.isLoading = false;
          const entities = processEntities([entity]);
          state.entities = merge({}, state.entities, arrayToObject(entities))
          state.focusedEntityId = entity?.id // doesn't this just make sense....
        },
      },
    },
  },
});
