import * as _ from 'lodash';
import { compactObject } from './object';

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
  if (options?.populate) return model.findOne(filter).populate(options.populate);
  return model.findOne(filter);
}

export const fetchOrCreate = async (model, filter, additionalParams = {}) => {
  const instance = await filterOne(model, filter);
  if (Boolean(instance)) return instance;
  return create(model, { ...filter, ...additionalParams });
}