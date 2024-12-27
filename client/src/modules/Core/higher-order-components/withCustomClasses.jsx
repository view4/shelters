import { useMemo } from "react";
import cx from 'classnames';

const format = (tree, props) => {
    return Object.entries(props).reduce((classes, [key, value]) => {
        return (tree[key] && Boolean(value)) ? [...classes, tree[key]] : classes
    }, props?.className ? [props.className] : [])
}

export default (Component, tree = {}) => (props) => {
    const classes = useMemo(() => format(tree, props), [props]);
    return <Component  {...props} className={cx(classes)} />
}