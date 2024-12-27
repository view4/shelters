import { useCallback, useState } from "react";

export default (initialValue) => {
  const [focusedId, setFocusedId] = useState(initialValue);
  const focus = useCallback((item) => setFocusedId(item?.id ?? item), []);
  const unFocus = useCallback(() => setFocusedId(null), []);
  return {
    focusedId,
    focus,
    unFocus,
    setFocusedId,
  };
};
