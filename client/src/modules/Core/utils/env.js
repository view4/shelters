import config from 'modules/Core/config';
export const getByEnv = (obj, defaultVal) => obj[config?.env] ?? defaultVal ;