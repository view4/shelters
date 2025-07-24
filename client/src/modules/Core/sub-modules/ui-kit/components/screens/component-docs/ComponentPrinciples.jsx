import React from 'react';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import styles from './styles.module.scss';

const ComponentPrinciples = ({ doc }) => {
  return (
    <Container className={styles.principlesSection}>
      <Title Element="h2" mb3>Design Principles</Title>
      <Container className={styles.principlesList}>
        {doc.principles.map((principle, index) => (
          <Container key={index} className={styles.principleItem}>
            <Container className={styles.principleContent}>
              <Text variant="body" className={styles.principleText}>
                {principle}
              </Text>
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default ComponentPrinciples; 