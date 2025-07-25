import React from 'react';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import styles from './styles.module.scss';

const ComponentIntro = ({ doc }) => {
  return (
    <Container className={styles.introSection}>
      <Title Element="h2" mb3>intro</Title>
      <Text variant="body" className={styles.componentIntro}>
        {doc.intro}
      </Text>
    </Container>
  );
};

export default ComponentIntro; 