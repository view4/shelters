import { useMemo } from 'react';
import config from 'config/features';

const FeatureWrapper = ({ featureKey, key, children, fallback }) => {
  // Use featureKey prop first, fallback to key prop for flexibility
  const keyToCheck = featureKey || key;
  
  const shouldRender = useMemo(() => {
    if (!keyToCheck) {
      console.warn('FeatureWrapper: No featureKey or key provided');
      return false;
    }

    // Get feature configuration
    const featureConfig = config[keyToCheck];
    
    // If feature doesn't exist in config, render by default
    if (!featureConfig) {
      return true;
    }
    
    // If feature is disabled, don't render anything
    if (featureConfig.disabled === true) {
      return false;
    }
    
    // Otherwise, render the children
    return true;
  }, [keyToCheck]);

  if (shouldRender) {
    return children;
  }

  // Render fallback if provided (accepts ReactNode or function returning ReactNode)
  return typeof fallback === 'function' ? fallback() : (fallback ?? null);
};

export default FeatureWrapper;
