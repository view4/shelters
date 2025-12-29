import { useMemo } from "react"
import c from "classnames"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import Screen from "../Screen"
import Sidemenu from "./Sidemenu"
import auth from "modules/auth/state"
import feed from "modules/booths/state/feed"
import boothCells from "modules/booths/state/index";
import { useOnLoad } from "modules/Core/hooks/useOnLoad"
import withShouldRender from "modules/Core/higher-order-components/withShouldRender"
import styles from "./styles.module.scss";
import UserGuideComponent from "../UserGuide"


export default strappedConnected(
    withShouldRender(Screen),
    {
        isAuthed: auth.validateToken.selectors.isAuthed,
        header: (state, { boothId }) => feed.cells.fetchEntity.selectField(boothId, "name")(state),
        focusedBoothId: boothCells.fetchFocusedBooth.selectors.id,
        focusedBoothExists: (state, { boothId }) => !!feed.cells.fetchEntity.selectField(boothId, "id")(state),
    },
    {
        fetchFocusedBooth: boothCells.fetchFocusedBooth.action,
        fetchBooth: (id) => feed.cells?.fetchEntity.action({ id })
    },
    ({ isAuthed, header, children, className, fetchFocusedBooth, focusedBoothId, fetchBooth, boothId, focusedBoothExists, ...props }) => {
        useOnLoad(
            () => fetchFocusedBooth(),
            !focusedBoothId && !focusedBoothExists && isAuthed,
            [focusedBoothId, focusedBoothExists, isAuthed]
        )
        useOnLoad(
            () => fetchBooth(boothId),
            Boolean(boothId) && !focusedBoothExists && isAuthed,
            [boothId, focusedBoothExists, isAuthed]
        )

        return ({
            LeftPanelComponent: Sidemenu,
            RightPanelComponent: UserGuideComponent,
            tripanel: true,
            header: false,
            className: c(styles.screen, className),
            shouldRender: Boolean(isAuthed),
            leftProps: useMemo(() => ({
                isAuthed,
                header
            }), [isAuthed, header]),
            rightProps: useMemo(() => ({
                boothId,
                focusedBoothId
            }), [boothId, focusedBoothId])
        })
    }

)