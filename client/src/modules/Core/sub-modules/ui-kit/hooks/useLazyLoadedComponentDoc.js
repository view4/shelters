import React, { useState, useEffect } from 'react';

const useLazyLoadedComponentDoc = (componentPath) => {
  const [doc, setDoc] = useState(null);
  const [LazyComponent, setLazyComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!componentPath) {
      setLoading(false);
      setError(new Error('No component path provided'));
      return;
    }

    const loadComponentDoc = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use require.context to find all docs.json files
        const docsContext = require.context('../components', true, /docs\.json$/);
        const docKeys = docsContext.keys();

        // Find the matching docs.json file
        let foundDoc = null;
        let foundDocKey = null;

        for (const key of docKeys) {
          try {
            const docData = docsContext(key);
            if (docData.path === componentPath) {
              foundDoc = docData;
              foundDocKey = key;
              break;
            }
          } catch (err) {
            console.warn(`Failed to load docs.json from ${key}:`, err);
          }
        }

        if (!foundDoc) {
          throw new Error(`No documentation found for component: ${componentPath}`);
        }

        setDoc(foundDoc);

        // Use React.lazy to dynamically import the component
        const componentPathParts = componentPath.split('/');
        const componentKey = componentPathParts[componentPathParts.length - 1];
        
        // Create a lazy component that imports from the correct path
        const LazyLoadedComponent = React.lazy(() => {
          return new Promise((resolve, reject) => {
            try {
              // Try to import the component from the docs.json location
              const componentContext = require.context('../components', true, /index\.jsx$/);
              const componentKeys = componentContext.keys();
              
              // Find the matching component file
              const matchingKey = componentKeys.find(key => {
                const keyPath = key.replace(/^\.\//, '').replace(/\/index\.jsx$/, '');
                return keyPath === componentPath;
              });

              if (matchingKey) {
                componentContext(matchingKey).then(module => {
                  resolve(module);
                }).catch(reject);
              } else {
                reject(new Error(`Component file not found for: ${componentPath}`));
              }
            } catch (err) {
              reject(err);
            }
          });
        });

        setLazyComponent(() => LazyLoadedComponent);
        setLoading(false);

      } catch (err) {
        console.error('Error loading component documentation:', err);
        setError(err);
        setLoading(false);
      }
    };

    loadComponentDoc();
  }, [componentPath]);

  return {
    doc,
    LazyComponent,
    loading,
    error
  };
};

export default useLazyLoadedComponentDoc; 