import * as _ from 'lodash';
import { compactObject } from './object';
import { FeedParams } from '../types';

export const TOTAL_COUNT = 'totalCount';

export const create = async (model, data) => {
  return model.create(data);
};

export const update = async (model, id, data, options = {}) => {
  return model.findByIdAndUpdate(id, data, {
    new: true,
    upsert: true,
    ...options
  });
};

export const exists = (model, filter) => {
  return model.exists(filter)
}

export const count = (model, filter) => {
  return model
    .countDocuments(filter)
}

export const upsertOne = async (model, data, filter, options = {}) => {
  return model.findOneAndUpdate(
    filter,
    data,
    { new: true, upsert: true, ...options },
  );
}


export const upsert = async (model, data, id = null, options = {}) => {
  if (Boolean(id)) return update(model, id, data, options);
  return create(model, data);
};

export const aggregate = (model, pipeline) => model.aggregate(pipeline);

export const connect = (from, localField, foreignField, as, pipeline = null) => {
  return {
    $lookup: compactObject({
      from,
      localField,
      foreignField,
      as,
      pipeline,
    },)
  };
};

export const unwind = (path, options) => {
  return {
    $unwind: {
      path: `$${path}`,
      ...options,
    },
  };
};

export const del = async (model, id) => {
  return model.findByIdAndDelete(id);
};

export const fetchOne = async (model, id, options = null) => {
  if (options?.populate) return model.findById(id).populate(options.populate);
  if (options?.select) return model.findById(id).select(options.select);
  return model.findById(id);
};

export const filter = (model, filter) => {
  return model.find(filter);
};

export const filterOne = (model, filter, options = null) => {
  let query = model.findOne(filter)
  if (options?.populate) query = query.populate(options.populate);
  if (options?.sort) query = query.sort(options.sort);

  // return model.findOne(filter);
  return query;
}

export const fetchOrCreate = async (model, filter, additionalParams = {}) => {
  const instance = await filterOne(model, filter);
  if (Boolean(instance)) return instance;
  return create(model, { ...filter, ...additionalParams });
}

export const aggregateFeed = async (model, feedParams, pipeline = []) => {
  const [result] = await aggregate(
    model,
    prepareFeedPipeline(feedParams, pipeline),
  );
  return {
    ...result,
    info: result.info[0] || { [TOTAL_COUNT]: null },
  };
};

export const prepareFeedPipeline = (feedParams = {}, pipeline) => {
  const facet = {
    entities: [...prepareEntitiesPipeline(feedParams, pipeline)],
    info: [...prepareFeedInfoPipeline(feedParams, pipeline)],
  };
  return [{ $facet: facet }];
};

export const prepareEntitiesPipeline = ({
  sort,
  skip,
  limit,
  match,
  segment,
  unwind,
  lookup,
  addFields,
  connectStamps
}: FeedParams, pipeline = []) => {
  return _.compact([
    match && { $match: match },
    sort && { $sort: sort },
    lookup && { $lookup: lookup },
    unwind && { $unwind: unwind },
    ...pipeline,
    (skip || segment?.[0]) && {
      $skip: segment?.[0] ?? skip,
    },
    (limit || segment?.[1]) && {
      $limit: segment?.[1]
        ? segment?.[1] - (segment?.[0] ?? skip)
        : limit + (skip || 0),
    },
    {
      $addFields: {
        id: '$_id',
        ...addFields,
      },
    },
    connectStamps && {
      $lookup: {
        from: 'stamps',
        localField: 'stamps',
        foreignField: '_id',
        as: 'stamps',
      },
    },
    connectStamps && {
      $addFields: {
        stamps: {
          $arrayElemAt: ['$stamps', 0],
        }
      }
    }
  ]);
};


export const prepareFeedInfoPipeline = ({
  match,
  lookup,
  unwind,
}: FeedParams, pipeline = []) => {
  return _.compact([
    match && { $match: match },
    lookup && { $lookup: lookup },
    unwind && { $unwind: unwind },
    ...pipeline,
    { $count: TOTAL_COUNT },
  ]);
};