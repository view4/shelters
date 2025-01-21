import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import cells from "modules/roadmaps/state/index";
import { useCallback } from "react";
import styles from "./styles.module.scss";

export default strappedConnected(
    withShouldRender(Button),
    {},
    {
        onClick: (gatewayId, key, callback) => cells.stampGateway.action({
            key,
            id: gatewayId,
            callback
        })
    },
    ({ gatewayId, stampKey, callback, onClick }) => ({
        onClick: useCallback(() => onClick(gatewayId, stampKey, callback), [onClick, gatewayId, stampKey, callback]),
        className: styles.container
    })
)