import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyLoadedComponentDoc } from '../../../hooks';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import Button from '../../Button';
import Loader from '../../Loader';
import Screen from '../../Screen';
import ComponentPreview from './ComponentPreview';
import ComponentProps from './ComponentProps';
import ComponentUsage from './ComponentUsage';
import ComponentIntro from './ComponentIntro';
import ComponentPrinciples from './ComponentPrinciples';
import styles from './styles.module.scss';

const ComponentDocsScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract component path from URL
    const pathSegments = location.pathname.split('/');
    const componentPathIndex = pathSegments.indexOf('components') + 1;
    const componentPath = pathSegments.slice(componentPathIndex).join('/');

    // Use the new hook to load component documentation and component
    const { doc, LazyComponent, loading, error } = useLazyLoadedComponentDoc(componentPath);

    const handleBackToHome = () => {
        navigate('/ui-kit');
    };

    if (loading) {
        return (
            <Screen>
                <Container className={styles.loadingContainer}>
                    <Loader size="large" />
                    <Text variant="body">Loading component documentation...</Text>
                </Container>
            </Screen>
        );
    }

    if (error) {
        return (
            <Screen>
                <Container className={styles.errorContainer}>
                    <Title level={2} mb3>Error Loading Component</Title>
                    <Text variant="error" mb3>{error.message}</Text>
                    <Button onClick={handleBackToHome}>Back to UI Kit</Button>
                </Container>
            </Screen>
        );
    }

    if (!doc) {
        return (
            <Screen>
                <Container className={styles.notFoundContainer}>
                    <Title level={2} mb3>Component Not Found</Title>
                    <Text variant="body" mb3>
                        The component "{componentPath}" could not be found in the UI Kit library.
                    </Text>
                    <Button onClick={handleBackToHome}>Back to UI Kit</Button>
                </Container>
            </Screen>
        );
    }

    return (
        <Screen>
            <Container className={styles.componentDocsScreen}>
                <Container className={styles.header}>
                    <Button
                        variant="secondary"
                        onClick={handleBackToHome}
                        className={styles.backButton}
                    >
                        ← Back to UI Kit
                    </Button>
                </Container>

                <Container className={styles.mainContent}>
                    {/* Left Side - Component Preview, Props, Usage */}
                    <Container className={styles.leftSection}>
                        <ComponentPreview
                            LazyComponent={LazyComponent}
                            demoProps={doc.demo?.props}
                        />

                        <ComponentProps doc={doc} />

                        <ComponentUsage doc={doc} />
                    </Container>

                    {/* Right Side - Documentation */}
                    <Container className={styles.documentationSection}>
                        <Title Element="h1" className={styles.componentTitle}>{doc.name}</Title>

                        <ComponentIntro doc={doc} />

                        <ComponentPrinciples doc={doc} />
                    </Container>
                </Container>
            </Container>
        </Screen>
    );
};

export default ComponentDocsScreen; 