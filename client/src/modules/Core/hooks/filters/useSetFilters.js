import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default (action) => {
    const dispatch = useDispatch();

    const appendFilters = useCallback((filter) => action && dispatch(action({ reset: false, ...filter })), [action])

    const setFilters = useCallback((filter) => action && dispatch(action({ reset: true, ...filter })), [action]);

    const resetFilters = useCallback(() => action && dispatch(action({ reset: true })), [action]);

    return {
        appendFilters,
        setFilters,
        resetFilters,
    }
}