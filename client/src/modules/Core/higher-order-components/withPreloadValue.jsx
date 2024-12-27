import React, { useEffect } from 'react';

export default (Component, useLogic, parseValue = (value, existingValue) => value) => (props) => {
  const value = useLogic();
  useEffect(() => (
    value && props.onChange(parseValue(value, props.value))
  ), [value]);
  return <Component {...props} />
}