import * as _ from 'lodash';

export const parsePath = (path) =>
  _.isArray(path) ? [...path] : path.split('.');

export const getIn = (obj, path = [], defaultValue = null) => {
  return _getIn(obj, parsePath(path), defaultValue);
};

const _getIn = (obj, path = [], defaultValue = null) => {
  if (path?.length === 0) return obj;
  const oldest = path.shift();
  const value = obj[oldest];
  if (value === undefined) return defaultValue;
  return getIn(value, path, defaultValue);
};

export const getter =
  (path, defaultValue = null) =>
  (obj) =>
    getIn(obj, parsePath(path), defaultValue);

export const compactObject = (obj) => _.pickBy(obj, (value) => value !== undefined && value !== null)