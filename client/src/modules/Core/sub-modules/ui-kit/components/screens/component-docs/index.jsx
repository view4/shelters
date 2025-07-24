import React, { Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyLoadedComponentDoc } from '../../../hooks';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import Button from '../../Button';
import Loader from '../../Loader';
import Screen from '../../Screen';
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
          
          <Container className={styles.componentHeader}>
            <Title level={1} mb2>{doc.name}</Title>
            <Text variant="caption" className={styles.componentKey}>
              {doc.key}
            </Text>
            <Text variant="body" className={styles.componentIntro}>
              {doc.intro}
            </Text>
          </Container>
        </Container>

        <Container className={styles.content}>
          <Container className={styles.section}>
            <Title level={2} mb3>Design Principles</Title>
            <Container className={styles.principlesList}>
              {doc.principles.map((principle, index) => (
                <Container key={index} className={styles.principleItem}>
                  <Text variant="body">{principle}</Text>
                </Container>
              ))}
            </Container>
          </Container>

          <Container className={styles.section}>
            <Title level={2} mb3>Live Preview</Title>
            <Container className={styles.previewContainer}>
              {LazyComponent ? (
                <Suspense fallback={
                  <Container className={styles.loadingPreview}>
                    <Loader size="medium" />
                    <Text variant="caption">Loading component preview...</Text>
                  </Container>
                }>
                  <Container className={styles.componentPreview}>
                    <LazyComponent {...doc.demo?.props} />
                  </Container>
                </Suspense>
              ) : (
                <Container className={styles.loadingPreview}>
                  <Loader size="medium" />
                  <Text variant="caption">Component preview not available</Text>
                </Container>
              )}
            </Container>
          </Container>

          <Container className={styles.section}>
            <Title level={2} mb3>Usage</Title>
            <Container className={styles.codeBlock}>
              <pre>
{`import { ${doc.key} } from 'modules/Core/sub-modules/ui-kit';

// Basic usage
<${doc.key}${doc.demo?.props ? Object.entries(doc.demo.props).map(([key, value]) => `\n  ${key}="${value}"`).join('') : ''} />`}
              </pre>
            </Container>
          </Container>

          {doc.demo?.props && Object.keys(doc.demo.props).length > 0 && (
            <Container className={styles.section}>
              <Title level={2} mb3>Props</Title>
              <Container className={styles.propsTable}>
                <Container className={styles.propsHeader}>
                  <Text variant="body" className={styles.propName}>Prop</Text>
                  <Text variant="body" className={styles.propType}>Type</Text>
                  <Text variant="body" className={styles.propDefault}>Default</Text>
                  <Text variant="body" className={styles.propDescription}>Description</Text>
                </Container>
                {Object.entries(doc.demo.props).map(([propName, propValue]) => (
                  <Container key={propName} className={styles.propRow}>
                    <Text variant="body" className={styles.propName}>{propName}</Text>
                    <Text variant="caption" className={styles.propType}>string</Text>
                    <Text variant="caption" className={styles.propDefault}>-</Text>
                    <Text variant="caption" className={styles.propDescription}>
                      {propName} prop for {doc.name}
                    </Text>
                  </Container>
                ))}
              </Container>
            </Container>
          )}
        </Container>
      </Container>
    </Screen>
  );
};

export default ComponentDocsScreen; 