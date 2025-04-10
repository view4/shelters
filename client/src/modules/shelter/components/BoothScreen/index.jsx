import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import Screen from "../Screen"
import Sidemenu from "./Sidemenu"
import { useMemo } from "react"
import auth from "modules/auth/state"
import feed from "modules/booths/state/feed"
import boothCells from "modules/booths/state/index";

import styles from "./styles.module.scss";
import { useOnLoad } from "modules/Core/hooks/useOnLoad"
import withShouldRender from "modules/Core/higher-order-components/withShouldRender"
import { isAction } from "redux"

export default strappedConnected(
    withShouldRender(Screen),
    {
        isAuthed: auth.validateToken.selectors.isAuthed,
        header: (state, { boothId }) => feed.cells.fetchEntity.selectField(boothId, "name")(state),
        activeBoothId: boothCells.fetchActiveBooth.selectors.id,
        focusedBoothExists: (state, { boothId }) => !!feed.cells.fetchEntity.selectField(boothId, "id")(state),
    },
    {
        fetchActiveBooth: boothCells.fetchActiveBooth.action,
        fetchBooth: (id) => feed.cells?.fetchEntity.action({ id })
    },
    ({ isAuthed, header, fetchActiveBooth, activeBoothId, fetchBooth, boothId, focusedBoothExists, ...props }) => {
        useOnLoad(
            () => fetchActiveBooth(),
            !activeBoothId && !focusedBoothExists && isAuthed,
            [activeBoothId, focusedBoothExists, isAuthed]
        )
        useOnLoad(
            () => fetchBooth(boothId),
            Boolean(boothId) && !focusedBoothExists && isAuthed,
            [boothId, focusedBoothExists, isAuthed]
        )
        return ({
            LeftPanelComponent: Sidemenu,
            tripanel: true,
            header: false,
            className: styles.screen,
            shouldRender: Boolean(isAuthed),
            leftProps: useMemo(() => ({
                isAuthed,
                header
            }), [isAuthed, header]),
        })
    }

)