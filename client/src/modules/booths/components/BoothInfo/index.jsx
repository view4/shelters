import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import feed from "modules/booths/state/feed";
import Features from "modules/Core/sub-modules/ui-kit/components/Features";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { useMemo } from "react";
import EditBoothButton from "../EditBoothButton";
import CompleteBoothButton from "../CompleteBoothButton";
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp";
import ActivateBoothButton from "../ActivateBoothButton";
import FocusBoothButton from "../FocusBoothButton";
import BoothParentCard from "../BoothParentCard";
import styles from "./styles.module.scss";

export default withFocusedBoothId(strappedConnected(
    Features,
    {
        booth: (state, { boothId }) => feed.cells.fetchEntity.selector(boothId)(state)
    },
    {},
    ({ booth, boothId }) => ({
        features: useMemo(() => booth &&([
            {
                name: "Booth Name",
                content: booth?.name
            },
            {
                name: "Booth Description",
                content: booth?.text
            },
            booth?.parent && {
                name: "Parent Booth",
                content: <BoothParentCard boothId={boothId} />
            },
            {
                content: <Features row features={[
                    booth?.stamps?.commenced && { name: "Commenced", content: <Stamp className={styles.stamp} timestamp={booth?.stamps?.commenced} /> },
                    booth?.stamps?.completed && { name: "Completed", content: <Stamp className={styles.stamp} timestamp={booth?.stamps?.completed} /> },
                    booth?.stamps?.focused && { name: "Focused", content: <Stamp className={styles.stamp} timestamp={booth?.stamps?.focused} /> }
                ]} />
            },
            {
                content: <EditBoothButton booth={booth} />
            },
            {
                content: <CompleteBoothButton />
            },
            {
                content: <ActivateBoothButton />
            },
            {
                content: <FocusBoothButton />
            }
        ]), [booth?.id, boothId, booth?.name, booth?.text]),
        card: true
    })
))