import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import RoadmapForm from '../RoadmapForm';
import styles from "./styles.module.scss";
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import feed from 'modules/roadmaps/state/feed';
import { useCallback, useMemo } from 'react';

const EditRoadmapButton = ({ onSuccess, roadmapId, values }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                Edit Roadmap
            </Button>
            <RoadmapForm
                title="Edit Roadmap"
                initialState={values}
                onSuccess={onSuccess}
                roadmapId={roadmapId}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default strappedConnected(
    EditRoadmapButton,
    {
        roadmap: (state, { roadmapId }) => feed.cells.fetchEntity.selector(roadmapId)(state),
    },
    {
        refetch: feed.cells.fetchEntity.action
    },
    ({ roadmap, roadmapId, refetch }) => ({
        values: useMemo(() => ({
            name: roadmap?.name,
            text: roadmap?.text,
        }), [roadmap?.id]),
        onSuccess: useCallback(() => refetch({ id: roadmapId }), [refetch, roadmapId])

    })
);