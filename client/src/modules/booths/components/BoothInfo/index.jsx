import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import feed from "modules/booths/state/feed";
import Features from "modules/Core/components/ui-kit/Features";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { useMemo } from "react";
import EditBoothButton from "../EditBoothButton";
import CompleteBoothButton from "../CompleteBoothButton";
import styles from "./styles.module.scss";
import Stamp from "modules/Core/components/ui-kit/Stamp";
import ActivateBoothButton from "../ActivateBoothButton";

export default withFocusedBoothId(strappedConnected(
    Features,
    {
        booth: (state, { boothId }) => feed.cells.fetchEntity.selector(boothId)(state)
    },
    {},
    ({ booth, boothId }) => ({
        features: useMemo(() => ([
            {
                name: "Booth Name",
                content: booth?.name
            },
            {
                name: "Booth Description",
                content: booth?.text
            },
            {
                content: <Features row features={[
                    { name: "Commenced", content: <Stamp className={styles.stamp} timestamp={booth?.stamps?.commenced} /> },
                    booth?.stamps?.completed && { name: "Completed", content: <Stamp className={styles.stamp} timestamp={booth?.stamps?.completed} /> }
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
            }
        ]), [booth?.id, boothId, booth?.name, booth?.text]),
        card: true
    })
))