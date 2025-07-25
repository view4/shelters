import React from 'react';
import { noop } from 'lodash';

const TextAreaInput = ({ onChange = noop, value, ...props }) => (
    <textarea
        onChange={(e) => onChange(e.target.value)}
        value={value}
        {...props}
    />
)

export default TextAreaInput