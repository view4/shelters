import Modal from 'modules/Core/components/ui-kit/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/components/ui-kit/Title';
import Container from 'modules/Core/components/ui-kit/Container';
import useTabs from 'modules/Core/hooks/useTabs';
import { useMemo } from 'react';
import CyclelessGatewaysFeed from '../CyclelessGatewaysFeed';
import styles from "./styles.module.scss";


export default ({ isOpen, close, schema, title = "Add Gateway", onSelectGateway, onSubmit, initialState }) => {

    const tabs = useMemo(() => ([{
        title: "Gateway Form",
        Component: () => <SchemaForm schema={schema} initialState={initialState} onSubmit={onSubmit} />
    }, {
        title: "Gateways",
        Component: () => <CyclelessGatewaysFeed onSelect={onSelectGateway} />
    }]), []);

    const { header, content } = useTabs(tabs)

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container p1 >
                <Title text={title} />
                {onSelectGateway && header}
            </Container>
            <Container className={styles.contentContainer}>
                {content}
            </Container>
        </Modal>
    )

}