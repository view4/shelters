import React from 'react';
import Container from '../../Container';
import Title from '../../Title';
import styles from './styles.module.scss';

const ComponentUsage = ({ doc }) => {
  return (
    <Container className={styles.usageSection}>
      <Title Element="h2" mb3>Usage</Title>
      <Container className={styles.codeBlock}>
        <pre>
{`import { ${doc.key} } from 'modules/Core/sub-modules/ui-kit';

// Basic usage
<${doc.key}${doc.demo?.props ? Object.entries(doc.demo.props).map(([key, value]) => `\n  ${key}="${value}"`).join('') : ''} />`}
        </pre>
      </Container>
    </Container>
  );
};

export default ComponentUsage; 