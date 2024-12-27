import { clone, isString, pickBy, merge } from "lodash"

export const arrayToObject = (array = [], keyField = 'id') => {
    return array.reduce((obj, item = {}) => {
        if (item[keyField]) obj[item[keyField]] = item
        return obj
    }, {})
}

export const compactObject = (obj) => pickBy(obj, (value) => value !== undefined && value !== null && value !== false)

export const get = (obj, key) => {
    if(isString(key)) key = key.split('.')
    const k = key.shift()
    if(key.length === 0) return obj[k]
    return get(obj[k], key)
};

export const renameKey = (object = {}, key, newKey) => ({
    ...object,
    [newKey]: object[key],
    [key]: undefined,
});

export const set = (obj, path, value) => {
    if (isString(path)) path = path.split('.');
    const key = path.shift();
    if (path.length === 0) return (obj[key] = value);
    return set(obj[key], path, value);
}

export const infuse = (a, b) => merge(clone(a), b)