import BoothScreen from "modules/shelter/components/BoothScreen";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothInfo from "modules/booths/components/BoothInfo";
import IntrospectionCard from "modules/booths/components/IntrospectionCard";
import SubBoothsCard from "modules/booths/components/SubBoothsCard";
import TeachingsFeed from "../../TeachingsFeed";
import TeachingFormButton from "../../TeachingFormButton";
import { BOOTH_KINDS } from "modules/booths/consts";
import styles from "./styles.module.scss";

const Component = ({ id: boothId }) => {
    console.log("TEACHINGs booth screen", boothId)
    return (
        <BoothScreen
            className={styles.screen}
            boothId={boothId}
            title="Teachings"
        >
            <IntrospectionCard
                className={styles.introspectionCard}
                title="Booth Info"
                boothId={boothId}
                defaultCollapsed
                collapsible
                lightShadow
            >
                <BoothInfo boothId={boothId} />
            </IntrospectionCard>
            <SubBoothsCard
                parentId={boothId}
                kind={BOOTH_KINDS.MALCHUT}
                title="Sub-Teaching Booths"
                defaultCollapsed
                className={styles.introspectionCard}
                collapsible
                lightShadow
            />
            <IntrospectionCard
                title="Teachings"
                boothId={boothId}
                maxWidth
                maxHeight
                className={styles.introspectionCard}
                collapsible
                lightShadow
                actions={[{ Component: TeachingFormButton, boothId }]}
            >
                <TeachingsFeed boothId={boothId} />
            </IntrospectionCard>
        </BoothScreen>
    )
}

export default strappedConnected(
    Component,
    {},
    {},
    () => ({})
)