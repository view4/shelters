import React, { useMemo } from "react"
import cx from "classnames"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import Screen from "modules/shelter/components/Screen"
import AdminSidemenu from "../AdminSidemenu"
import auth from "modules/auth/state"
import withShouldRender from "modules/Core/higher-order-components/withShouldRender"
import styles from "./styles.module.scss";

export default strappedConnected(
    withShouldRender(Screen),
    {
        isAuthed: auth.validateToken.selectors.isAuthed,
    },
    {},
    ({ isAuthed, header, className }) => {
        return ({
            LeftPanelComponent: AdminSidemenu,
            RightPanelComponent: false,
            tripanel: true,
            header: false,
            className: cx(styles.screen, className),
            shouldRender: Boolean(isAuthed),
            leftProps: useMemo(() => ({
                isAuthed,
                header
            }), [isAuthed, header]),
        })
    }
)