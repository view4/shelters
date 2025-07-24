import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "../../state/feed";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import { STAMP_SEQUENCE } from "../../consts";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import { useCallback } from "react";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import styles from "./styles.module.scss";

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
        const currentIndex = STAMP_SEQUENCE.indexOf(currentStamp?.key);
        const nextStamp = STAMP_SEQUENCE[currentIndex + 1];

        const onSuccess = useOnSuccess();

        const callback = useCallback((res) => {
            if (!res?.id) return null;
            onSuccess("Feature stamped");
            fetchEntity({ id });
            return res;
        }, [onSuccess, fetchEntity, id]);

        const handleStamp = async () => {
            stampEntity({ id, key: nextStamp, callback });
        };

        return {
            onClick: handleStamp,
            children: `Stamp: ${nextStamp}`,
            className: styles.container,
            shouldRender: !!nextStamp
        };
    }
); 