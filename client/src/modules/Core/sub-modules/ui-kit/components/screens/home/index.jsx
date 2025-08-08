import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUiKitDocumentedComponents } from '../../../hooks';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import Input from '../../Input';
import Loader from '../../Loader';
import Screen from '../../Screen';
import styles from './styles.module.scss';

const Sidebar = ({ searchTerm, setSearchTerm, groupedComponents, loading, error, navigateToComponent, filteredComponents, components }) => (
    <Container className={styles.sidebar}>
        <Container className={styles.sidebarHeader}>
            <Title level={3} mb2>UI Kit Components</Title>
            <Input
                key="search-input"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(v) => setSearchTerm(v)}
                className={styles.searchInput}
            />
        </Container>

        <Container className={styles.sidebarContent}>
            {loading ? (
                <Container className={styles.loadingState}>
                    <Loader size="medium" />
                    <Text variant="caption">Loading components...</Text>
                </Container>
            ) : error ? (
                <Container className={styles.errorState}>
                    <Text variant="error">Error loading components: {error.message}</Text>
                </Container>
            ) : (
                <Container className={styles.componentsList}>
                    {Object.entries(groupedComponents).map(([section, sectionComponents]) => (
                        <Container key={section} className={styles.section}>
                            <Title level={4} className={styles.sectionTitle}>
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </Title>
                            <Container className={styles.sectionComponents}>
                                {sectionComponents.map((component) => (
                                    <Container
                                        key={`${component.key}-${component.path}`}
                                        className={styles.componentItem}
                                        onClick={() => navigateToComponent(component)}
                                    >
                                        <Text variant="body" className={styles.componentName}>
                                            {component.name}
                                        </Text>
                                    </Container>
                                ))}
                            </Container>
                        </Container>
                    ))}
                </Container>
            )}
        </Container>

        <Container className={styles.sidebarFooter}>
            <Text variant="caption" className={styles.componentCount}>
                {filteredComponents.length} of {components.length} components
            </Text>
        </Container>
    </Container>
);

const UIKitHomeScreen = React.memo(() => {
    const [searchTerm, setSearchTerm] = useState('');
    const { components, loading, error } = useUiKitDocumentedComponents();
    const navigate = useNavigate();

    const filteredComponents = useMemo(() =>
        components.filter(component =>
            component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.key.toLowerCase().includes(searchTerm.toLowerCase())
        ), [components, searchTerm]
    );

    const groupedComponents = useMemo(() =>
        filteredComponents.reduce((groups, component) => {
            const section = component.section || 'general';
            if (!groups[section]) {
                groups[section] = [];
            }
            groups[section].push(component);
            return groups;
        }, {}), [filteredComponents]
    );

    const navigateToComponent = (component) => {
        const pathParts = component.path.split('/');
        const urlPath = pathParts.map(part => part.toLowerCase()).join('/');
        const fullUrl = `/ui-kit/components/${urlPath}`;

        navigate(fullUrl);
    };



    return (
        <Screen>
            <Container className={styles.homeScreen}>
                <Sidebar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    groupedComponents={groupedComponents}
                    loading={loading}
                    error={error}
                    navigateToComponent={navigateToComponent}
                    filteredComponents={filteredComponents}
                    components={components}
                />

                <Container className={styles.mainContent}>
                    <Container maxWidth className={styles.contentContainer}>
                        <Container className={styles.welcomeSection}>
                            <Title level={1} mb3>UI Kit Library</Title>
                            <Text variant="body" mb4>
                                Welcome to the UI Kit documentation. This library contains all the reusable components
                                that make up our design system. Use the sidebar to explore components by category
                                or search for specific functionality.
                            </Text>

                            <Container className={styles.statsGrid}>
                                <Container className={styles.statCard}>
                                    <Title level={3}>{components.length}</Title>
                                    <Text variant="caption">Total Components</Text>
                                </Container>
                                <Container className={styles.statCard}>
                                    <Title level={3}>{Object.keys(groupedComponents).length}</Title>
                                    <Text variant="caption">Categories</Text>
                                </Container>
                                <Container className={styles.statCard}>
                                    <Title level={3}>
                                        {components.reduce((total, comp) => total + comp.principles.length, 0)}
                                    </Title>
                                    <Text variant="caption">Design Principles</Text>
                                </Container>
                            </Container>
                        </Container>

                        <Container className={styles.quickStartSection}>
                            <Title level={2} mb3>Quick Start</Title>
                            <Text variant="body" mb3>
                                To use any component from this library, import it from the UI Kit module:
                            </Text>

                            <Container className={styles.codeBlock}>
                                <pre>
                                    {`import { Button, Container, Card } from 'modules/Core/sub-modules/ui-kit';

// Use components in your JSX
<Container>
  <Card>
    <Button>Click me</Button>
  </Card>
</Container>`}
                                </pre>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Screen>
    );
});

export default UIKitHomeScreen;
