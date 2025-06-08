import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "../../state/feed";
import Button from "modules/Core/components/ui-kit/Button";
import { FEATURE_STAMPS } from "../../consts";
import styles from "./styles.module.scss";

const STAMP_SEQUENCE = [
    FEATURE_STAMPS.PROSPECTIVE,
    FEATURE_STAMPS.COMMITTED,
    FEATURE_STAMPS.COMMENCED,
    FEATURE_STAMPS.DEPLOYED,
    FEATURE_STAMPS.ACCEPTED
];

export default strappedConnected(
    Button,
    {},
    {
        stampEntity: feed.cells.stampEntity.action,
        fetchEntity: feed.cells.fetchEntity.action
    },
    ({ id, currentStamp, stampEntity, fetchEntity }) => {
        if (!currentStamp) return null;

        const currentIndex = STAMP_SEQUENCE.indexOf(currentStamp.key);
        const nextStamp = STAMP_SEQUENCE[currentIndex + 1];
        console.log(currentStamp, currentIndex, nextStamp)

        if (!nextStamp) return null;

        const handleStamp = async () => {
            await stampEntity({ id, key: nextStamp });
            await fetchEntity({ id });
        };

        return {
            onClick: handleStamp,
            children: `Stamp: ${nextStamp}`,
            className: styles.container
        };
    }
); 