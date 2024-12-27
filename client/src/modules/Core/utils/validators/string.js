export const minLengthValidator = (value = '', minLength) => value.length >= minLength;
export const getMinLengthValidator = (minLength) => (value) => minLengthValidator(value, minLength);
export const getRegexValidator = (regex) => (value) => regex.test(value);

export const getExactLengthValidator = (exactLength) => (value) => value.length === exactLength;