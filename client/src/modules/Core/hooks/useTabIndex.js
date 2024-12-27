import { useState, useCallback } from "react";

export default (initialIndex = 0) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialIndex);
  const next = useCallback(
    () => setActiveTabIndex((index) => index + 1),
    [setActiveTabIndex]
  );

  const back = useCallback(
    () => setActiveTabIndex((index) => index - 1),
    [setActiveTabIndex]
  );
  return { activeTabIndex, setActiveTabIndex, next, back };
};
