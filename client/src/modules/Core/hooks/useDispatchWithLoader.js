import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export default (action, { callback } = {}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleAction = useCallback(async (args) => {
        setIsLoading(true);
        dispatch(action({
            callback: (...args) => {
                setIsLoading(false);
                callback?.(...args);
            },
            ...args
        }))
    }, [callback, dispatch, action]);

    return [handleAction, isLoading, dispatch];
};