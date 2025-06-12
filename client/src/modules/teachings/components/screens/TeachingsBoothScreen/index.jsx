import BoothScreen from "modules/shelter/components/BoothScreen";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothInfo from "modules/booths/components/BoothInfo";
import IntrospectionCard from "modules/booths/components/IntrospectionCard";
import TeachingsFeed from "../../TeachingsFeed";
import TeachingFormButton from "../../TeachingFormButton";
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
            >
                <BoothInfo boothId={boothId} />
            </IntrospectionCard>
            <IntrospectionCard
                title="Teachings"
                boothId={boothId}
                maxWidth
                maxHeight
                className={styles.introspectionCard}
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