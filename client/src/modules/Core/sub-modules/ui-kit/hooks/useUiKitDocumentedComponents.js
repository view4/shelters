import { useState, useEffect } from 'react';

/**
 * React hook that dynamically loads all docs.json files from the UI Kit components directory
 * and returns a sorted array of documented components.
 * 
 * @returns {Object} Object containing:
 *   - components: Array of documented components sorted by name
 *   - loading: Boolean indicating if components are being loaded
 *   - error: Error object if loading failed
 */
const useUiKitDocumentedComponents = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use require.context to get all docs.json files recursively
        const docsContext = require.context('../components', true, /docs\.json$/);
        const componentKeys = docsContext.keys();

        const loadedComponents = [];
        const seenKeys = new Set(); // Track seen component keys to prevent duplicates
        const seenPaths = new Set(); // Track seen paths as backup

        for (const key of componentKeys) {
          try {
            // Load the docs.json file
            const docsData = docsContext(key);
            
            // Validate that the docs.json has the required structure
            if (docsData && typeof docsData === 'object') {
              // Extract the component path from the require.context key
              // Remove './' prefix and '/docs.json' suffix
              const componentPath = key.replace(/^\.\//, '').replace(/\/docs\.json$/, '');
              
              // Create component object with metadata
              const component = {
                name: docsData.name || 'Unnamed Component',
                key: docsData.key || componentPath,
                path: docsData.path || componentPath,
                section: docsData.section || 'general',
                intro: docsData.intro || '',
                principles: docsData.principles || [],
                demo: docsData.demo || {},
                // Add the full path for dynamic imports
                fullPath: key,
                // Add the component directory path
                componentPath: componentPath
              };

              // Check for duplicates using both key and path
              if (!seenKeys.has(component.key) && !seenPaths.has(component.path)) {
                seenKeys.add(component.key);
                seenPaths.add(component.path);
                loadedComponents.push(component);
              }
            }
          } catch (componentError) {
            console.warn(`Failed to load component docs from ${key}:`, componentError);
            // Continue loading other components even if one fails
          }
        }

        // Sort components by name
        const sortedComponents = loadedComponents.sort((a, b) => 
          a.name.localeCompare(b.name)
        );

        setComponents(sortedComponents);
      } catch (err) {
        console.error('Error loading UI Kit documented components:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  return {
    components,
    loading,
    error
  };
};

export default useUiKitDocumentedComponents; 