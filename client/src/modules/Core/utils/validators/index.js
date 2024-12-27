export const validateRequired = (value) => (value === false || Boolean(value));
export const validators = (...validators) => (value) => validators.every((validator) => validator(value));