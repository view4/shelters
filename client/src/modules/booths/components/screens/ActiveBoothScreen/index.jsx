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
                <Card className={styles.placeholder} header="No Focused Booth Found" fitContent  >
                    No focused booths found, return to booths feed to see available booths.
                </Card>
            </Loader>
        </Screen>
    )
}

export default strappedConnected(
    component,
    {
        focusedBoothId: cells.fetchFocusedBooth.selectors.id,
        isLoading: cells.fetchFocusedBooth.selectors.isLoading
    },
    { fetch: cells.fetchFocusedBooth.action },
    ({  focusedBoothId, isLoading }) => {
        return {
            // shouldDisplayPlaceholder: !focusedBoothId && !isLoading
        }
    }
);