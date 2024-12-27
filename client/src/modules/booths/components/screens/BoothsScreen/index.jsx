import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default strappedConnected(
    component,
    {},
    {},
    ({ }) => {
        const nav = useNavigate();
        return {
            onClick: useCallback(({ id }) => nav(`/booths/${id}`), [nav])
        }
    }
)