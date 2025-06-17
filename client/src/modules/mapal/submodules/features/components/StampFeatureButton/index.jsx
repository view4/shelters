import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "../../state/feed";
import Button from "modules/Core/components/ui-kit/Button";
import { FEATURE_STAMPS } from "../../consts";
import styles from "./styles.module.scss";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import { useCallback } from "react";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";

const STAMP_SEQUENCE = [
    FEATURE_STAMPS.PROSPECTIVE,
    FEATURE_STAMPS.COMMITTED,
    FEATURE_STAMPS.COMMENCED,
    FEATURE_STAMPS.DEPLOYED,
    FEATURE_STAMPS.ACCEPTED
];

export default strappedConnected(
    withShouldRender(Button),
    {
        currentStamp: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "currentStamp")(state)

    },
    {
        stampEntity: feed.cells.stampEntity.action,
        fetchEntity: feed.cells.fetchEntity.action
    },
    ({ featureId: id, currentStamp, stampEntity, fetchEntity }) => {
        console.log({currentStamp})

        const currentIndex = STAMP_SEQUENCE.indexOf(currentStamp.key);
        const nextStamp = STAMP_SEQUENCE[currentIndex + 1];
        console.log({currentStamp, currentIndex, nextStamp})

        const onSuccess = useOnSuccess();

        const callback = useCallback((res) => {
            console.log("res", res);
            if (!res?.id) return null;
            onSuccess("Feature stamped");
            fetchEntity({ id });
            return res;
        }, [onSuccess, fetchEntity]);

        const handleStamp = async () => {
            stampEntity({ id, key: nextStamp, callback });
            // await fetchEntity({ id });
        };

        console.log({
            nextStamp, currentStamp, currentIndex,
        })
        return {
            onClick: handleStamp,
            children: `Stamp: ${nextStamp}`,
            className: styles.container,
            shouldRender: !!nextStamp
        };
    }
); 