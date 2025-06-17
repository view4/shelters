import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "../../state";
import feed from "../../state/feed";
import Component from "./component";

export default strappedConnected(
    Component,
    {},
    {
        upsertFeatureVote: cells.upsertFeatureVote.action,
        refetchEntity: feed.cells.fetchEntity.action
    },
    ({ featureId, upsertFeatureVote, isOpen, onSuccess, refetchEntity }) => {
        const handleSubmit = (data) => {
            upsertFeatureVote({
                input: {
                    featureId,
                    ...data
                }
            });
            refetchEntity({ id: featureId });
            onSuccess();
        };

        return {
            isOpen,
            onSubmit: handleSubmit
        };
    }
); 