import { useDispatch } from "react-redux";
import { useOnLoad } from "../hooks/useOnLoad";
import { useMemo } from "react";

export default (Component, fetcher, paramsKey) => ({ params, shouldFetch = false, ...props }) => {
    const dispatch = useDispatch();
    const args = useMemo(() => paramsKey ? ({[paramsKey]: props[paramsKey] }) : params, [paramsKey, params])
    useOnLoad(
        () => dispatch(fetcher(args)),
        shouldFetch,
        [params, shouldFetch]
    )
    return <Component {...props} />
}
