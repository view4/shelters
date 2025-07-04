import React from "react";
import { useCallback } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Component from "./component";

export default strappedConnected(
    Component,
    {},
    {},
    ({ featureId }) => {
        const { isOpen, open, close } = useIsOpen();

        return {
            isOpen,
            onOpen: useCallback(() => open(), [open]),
            onClose: useCallback(() => close(), [close]),
            featureId
        };
    }
); 