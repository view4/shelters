import { useMemo } from "react";

export default (tree = {}, Default) => (props) => {
    const [key, Component] = useMemo(() => Object.entries(tree)?.find(([key, Component]) => (props.hasOwnProperty(key)) && Boolean(props[key]) ) ?? [null, Default], [props, Default]);
    return <Component {...props} />
}