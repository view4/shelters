import FeedModule from "modules/Core/core-modules/FeedModule";
import { unique } from 'modules/Core/utils/array';
import { arrayToObject, compactObject } from 'modules/Core/utils/obj';
import { merge } from 'lodash';
import { ROADMAPS } from "../consts";
import middleware from "../middleware";

const flatten = entity => compactObject({
  ...entity,
  children: null,
  childrenIds: entity?.children?.map((c) => c.id)
})

const processEntities = (entities = []) => {
  // TODO: handle parent as well.... but I think for current scope let's handle for children..
  return entities.reduce((entities, entity) => {
    if (!entity?.children?.length) return [...entities, entity];
    return [
      ...entities,
      flatten(entity),
      ...children
    ]

  }, [])
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
          const entities = processEntities(payload?.entities)
          const newStreamIds = payload?.entities?.map?.(entity => entity.id) ?? []
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
        reducer: (state, { payload }) => {
          state.isLoading = false;
          const entities = [
            flatten(payload.entity),
            ...payload.entity.children
          ]
          state.entities = merge({}, state.entities, arrayToObject(entities))
          state.focusedEntityId = payload?.id // doesn't this just make sense....
        },
      },
    },
  },
});
