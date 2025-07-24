import React, { useState } from 'react';
import Container from '../components/Container';
import Card from '../components/Card';
import Title from '../components/Title';
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import Stamp from '../components/Stamp';
import Screen from '../components/Screen';
// import docsData from '../docs.json';
import styles from './styles.module.scss';

const docsData = {}
const UIKitDocs = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredComponents = docsData.components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderComponentExample = (componentName, example) => {
    const props = {};
    
    // Parse the example code to extract props
    const propMatches = example.code.match(/(\w+)="([^"]*)"/g);
    if (propMatches) {
      propMatches.forEach(match => {
        const [key, value] = match.split('=');
        props[key] = value.replace(/"/g, '');
      });
    }

    switch (componentName) {
      case 'Button':
        return <Button {...props}>{example.code.match(/>([^<]*)</)?.[1] || 'Button'}</Button>;
      case 'Container':
        return <Container {...props}>{example.code.match(/>([^<]*)</)?.[1] || 'Content'}</Container>;
      case 'Card':
        return <Card {...props}>{example.code.match(/>([^<]*)</)?.[1] || 'Card content'}</Card>;
      case 'Input':
        return <Input {...props} />;
      case 'Title':
        return <Title {...props}>{example.code.match(/>([^<]*)</)?.[1] || 'Title'}</Title>;
      case 'Text':
        return <Text {...props}>{example.code.match(/>([^<]*)</)?.[1] || 'Text content'}</Text>;
      case 'Stamp':
        return <Stamp {...props} timestamp={new Date()} />;
      case 'Loader':
        return <Loader {...props} />;
      case 'Screen':
        return <div style={{ height: '100px', border: '1px solid #ccc', padding: '10px' }}>
          <Screen {...props}>{example.code.match(/>([^<]*)</)?.[1] || 'Screen content'}</Screen>
        </div>;
      default:
        return <div className={styles.codeBlock}>{example.code}</div>;
    }
  };

  const renderPropsTable = (props) => {
    if (!props) return null;

    return (
      <div className={styles.propsTable}>
        <Title level={3}>Props</Title>
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(props).map(([propName, propDetails]) => (
              <tr key={propName}>
                <td><code>{propName}</code></td>
                <td>
                  <code>{propDetails.type}</code>
                  {propDetails.options && (
                    <div className={styles.options}>
                      Options: {propDetails.options.join(', ')}
                    </div>
                  )}
                </td>
                <td>{propDetails.default !== undefined ? <code>{String(propDetails.default)}</code> : '-'}</td>
                <td>{propDetails.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const ComponentDetail = ({ component }) => (
    <div className={styles.componentDetail}>
      <Container flex spaceBetween alignCenter mb3>
        <Title level={2}>{component.name}</Title>
        <Button variant="outline" onClick={() => setSelectedComponent(null)}>
          Back to List
        </Button>
      </Container>
      
      <Text className={styles.description} mb4>
        {component.description}
      </Text>

      {renderPropsTable(component.props)}

      <div className={styles.examples}>
        <Title level={3} mb3>Examples</Title>
        {component.examples.map((example, index) => (
          <Card key={index} className={styles.exampleCard} mb3>
            <Title level={4} mb2>{example.title}</Title>
            <div className={styles.exampleCode}>
              <code>{example.code}</code>
            </div>
            <div className={styles.examplePreview}>
              {renderComponentExample(component.name, example)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const ComponentList = () => (
    <div className={styles.componentList}>
      <Container flex spaceBetween alignCenter mb4>
        <Title level={1}>UI Kit Components</Title>
        <Button onClick={() => setShowModal(true)}>
          View All Examples
        </Button>
      </Container>

      <Container mb4>
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Container>

      <div className={styles.componentsGrid}>
        {filteredComponents.map((component) => (
          <Card
            key={component.name}
            className={styles.componentCard}
            onClick={() => setSelectedComponent(component)}
            lightShadow
          >
            <Title level={3} mb2>{component.name}</Title>
            <Text variant="caption" mb3>
              {component.description}
            </Text>
            <div className={styles.componentPreview}>
              {renderComponentExample(component.name, component.examples[0])}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Screen>
      <Container maxWidth className={styles.uiKitDocs}>
        {selectedComponent ? (
          <ComponentDetail component={selectedComponent} />
        ) : (
          <ComponentList />
        )}
      </Container>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className={styles.allExamplesModal}>
          <Title level={2} mb4>All Component Examples</Title>
          {docsData.components.map((component) => (
            <div key={component.name} className={styles.modalComponent}>
              <Title level={3} mb2>{component.name}</Title>
              <div className={styles.modalExamples}>
                {component.examples.map((example, index) => (
                  <div key={index} className={styles.modalExample}>
                    <Text variant="caption" mb1>{example.title}</Text>
                    {renderComponentExample(component.name, example)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </Screen>
  );
};

export default UIKitDocs; 