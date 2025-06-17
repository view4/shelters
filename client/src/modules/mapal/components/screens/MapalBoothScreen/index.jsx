import BoothScreen from "modules/shelter/components/BoothScreen";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import FeatureFeed from "modules/mapal/submodules/features/components/FeatureFeed";
import BoothInfo from "modules/booths/components/BoothInfo";
import IntrospectionCard from "modules/booths/components/IntrospectionCard";
import FeatureFormButton from "modules/mapal/submodules/features/components/FeatureFormButton";
import styles from "./styles.module.scss";

// const tabs = [
//     {
//         title: "Features",
//         Component: FeatureFeed
//     },
//     {
//         title: "Details",
//         Component: ({ boothId }) => (
//             <Container flex row alignCenter maxWidth>
//                 <BoothInfo boothId={boothId} />
//             </Container>
//         )
//     }
// ]

const Component = ({ id: boothId }) => {
    console.log("MAPAL booth screen", boothId)
    return (
        <BoothScreen className={styles.screen} boothId={boothId}>
            <IntrospectionCard 
                className={styles.introspectionCard} 
                title="Booth Info" 
                // actions={[{ Component: FeatureFormButton, boothId }]}
            >

                <BoothInfo boothId={boothId} />
            </IntrospectionCard>
            <IntrospectionCard
                title="Features"
                maxWidth
                maxHeight
                className={styles.introspectionCard}
                actions={[{ Component: FeatureFormButton, boothId }]}
            >
                <FeatureFeed boothId={boothId} />
            </IntrospectionCard>
        </BoothScreen>
    )
}

export default strappedConnected(
    Component,
    {
    },
    {
    },
    () => ({})
)