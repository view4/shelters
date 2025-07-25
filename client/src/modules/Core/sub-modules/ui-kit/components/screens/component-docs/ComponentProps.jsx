import React from 'react';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import styles from './styles.module.scss';

const ComponentProps = ({ doc }) => {
  if (!doc.demo?.props || Object.keys(doc.demo.props).length === 0) {
    return null;
  }

  return (
    <Container className={styles.propsSection}>
      <Title Element="h2" mb3>Props</Title>
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
  );
};

export default ComponentProps; 