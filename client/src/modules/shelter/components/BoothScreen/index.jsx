import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import Screen from "../Screen"
import Sidemenu from "./Sidemenu"
import { useMemo } from "react"
import auth from "modules/auth/state"
import feed from "modules/booths/state/feed"
import styles from "./styles.module.scss";

export default strappedConnected(
    Screen,
    {
        isAuthed: auth.validateToken.selectors.isAuthed,
        header: (state, { boothId }) => feed.cells.fetchEntity.selectField(boothId, "name")(state)
    },
    {},
    ({ isAuthed,  header }) => ({
        LeftPanelComponent: Sidemenu,
        tripanel: true,
        header: false,
        className: styles.screen,
        leftProps: useMemo(() => ({
            isAuthed,
            header
        }), [isAuthed, header]),
    })
)