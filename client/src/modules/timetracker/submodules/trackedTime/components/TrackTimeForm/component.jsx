import { useMemo } from 'react';
import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/sub-modules/ui-kit/components/Title';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import useTabs from 'modules/Core/hooks/useTabs';
import SelectTrackedTimeFeed from './SelectTrackedTimeFeed';
import styles from "./styles.module.scss";

export default ({ isOpen, close, schema, onSubmit, initialState, title = "Track Time", trackExisting }) => {
    const tabs = useMemo(() => ([{
        title: "Track Time Form",
        Component: () => <SchemaForm schema={schema} initialState={initialState} onSubmit={onSubmit} />
    }, {
        title: "Link Tracked Time",
        Component: () => <SelectTrackedTimeFeed onSelect={trackExisting} />
    }]), [schema, initialState, onSubmit, trackExisting]);

    const { header, content } = useTabs(tabs);

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container p1>
                <Title text={title} />
                {trackExisting && header}
            </Container>
            <Container className={styles.contentContainer}>
                {content}
            </Container>
        </Modal>
    );
};