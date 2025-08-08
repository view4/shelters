import { useMemo } from 'react';
import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/sub-modules/ui-kit/components/Title';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import useTabs from 'modules/Core/hooks/useTabs';
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import ImportDedicatedTimeFeed from './ImportDedicatedTimeFeed';
import styles from "./styles.module.scss";


export default ({ close, isOpen, schema, onSubmit, initialState, title = "Dedicate Time", onImport }) => {
    const tabs = useMemo(() => ([{
        title: "Dedicate Time Form",
        Component: () => <SchemaForm schema={schema} initialState={initialState} onSubmit={onSubmit} />
    }, {
        title: "Import",
        Component: () => withFocusedBoothId(ImportDedicatedTimeFeed)({ onSelect: onImport })
    }]), [schema, initialState, onSubmit, onImport]);

    const { header, content } = useTabs(tabs);

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container p1>
                <Title text={title} />
                {onImport && header}
            </Container>
            <Container className={styles.contentContainer}>
                {content}
            </Container>
        </Modal>
    );
}
