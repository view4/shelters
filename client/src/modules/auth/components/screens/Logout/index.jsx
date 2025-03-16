import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/auth/state";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default strappedConnected(
    Fragment,
    {},
    { logout: cells.logout.action },
    ({ logout }) => {
        const nav = useNavigate()

        useEffect(() => {
            logout()
            nav("/")
        }, []);
        return {
        }
    }
)