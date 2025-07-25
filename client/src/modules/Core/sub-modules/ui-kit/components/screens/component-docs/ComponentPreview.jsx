import React, { Suspense } from 'react';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import Loader from '../../Loader';
import styles from './styles.module.scss';

const ComponentPreview = ({ LazyComponent, demoProps }) => {
  return (
    <Container className={styles.previewContainer}>
      <Title Element="h2" className={styles.previewTitle}>Live Preview</Title>
      {LazyComponent ? (
        <Suspense fallback={
          <Container className={styles.loadingPreview}>
            <Loader size="medium" />
            <Text variant="caption">Loading component preview...</Text>
          </Container>
        }>
          <Container className={styles.componentPreview}>
            <LazyComponent {...demoProps} />
          </Container>
        </Suspense>
      ) : (
        <Container className={styles.loadingPreview}>
          <Loader size="medium" />
          <Text variant="caption">Component preview not available</Text>
        </Container>
      )}
    </Container>
  );
};

export default ComponentPreview; 