import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "../BoothScreen/component";
import cells from "modules/booths/state/index";
import { useMemo } from "react";
import Card from "modules/Core/components/ui-kit/Card";
import Screen from "modules/Core/components/ui-kit/Screen";
import styles from "./styles.module.scss";
import Loader from "modules/Core/components/ui-kit/Loader";

const withPlaceholder = (Component, PlaceholderComponent, isEmptyKey = "shouldDisplayPlaceholder") => (props) => {
    const C = useMemo(() => Boolean(props[isEmptyKey]) ? PlaceholderComponent : Component, [PlaceholderComponent, Component, props?.[isEmptyKey]]);
    return <C {...props} />
}

const Placeholder = ({ isLoading }) => {
    return (
        <Screen flex center hideHeader={true}>
            <Loader overlay loading={isLoading}>
                <Card className={styles.placeholder} header="No active Booth Found" fitContent  >
                    No active booths found, return to booths feed to see available booths.
                </Card>
            </Loader>
        </Screen>
    )
}

export default strappedConnected(
    withPlaceholder(component, Placeholder),
    {
        activeBoothId: cells.fetchActiveBooth.selectors.id,
        isLoading: cells.fetchActiveBooth.selectors.isLoading
    },
    { fetch: cells.fetchActiveBooth.action },
    ({  activeBoothId, isLoading }) => {
        // const shouldDisplayPlaceholder = useMemo(() => !activeBoothId && !isLoading, [activeBoothId, isLoading]);
        return {
            // shouldDisplayPlaceholder
        }
    }
);