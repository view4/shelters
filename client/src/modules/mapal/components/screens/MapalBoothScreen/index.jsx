import BoothScreen from "modules/shelter/components/BoothScreen";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import FeatureFeed from "modules/mapal/submodules/features/components/FeatureFeed";
import BoothInfo from "modules/booths/components/BoothInfo";
import IntrospectionCard from "modules/booths/components/IntrospectionCard";
import FeatureFormButton from "modules/mapal/submodules/features/components/FeatureFormButton";
import SubBoothsCard from "modules/booths/components/SubBoothsCard";
import { BOOTH_KINDS } from "modules/booths/consts";
import styles from "./styles.module.scss";

const Component = ({ id: boothId }) => {
    return (
        <BoothScreen className={styles.screen} boothId={boothId}>
            <IntrospectionCard
                className={styles.introspectionCard}
                title="Booth Info"
            >
                <BoothInfo boothId={boothId} />
            </IntrospectionCard>
            <IntrospectionCard
                title="Features"
                className={styles.introspectionCard}
                actions={[{ Component: FeatureFormButton, boothId }]}
            >
                <FeatureFeed boothId={boothId} />
            </IntrospectionCard>
            <SubBoothsCard
                parentId={boothId}
                kind={BOOTH_KINDS.MALCHUT}
                title="Sub-Booths"
                collapsible
                defaultCollapsed

            />
        </BoothScreen>
    )
}

export default strappedConnected(
    Component,
    {},
    {},
    () => ({})
)