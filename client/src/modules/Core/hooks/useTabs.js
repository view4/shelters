import { useCallback, useEffect, useMemo } from "react";
import useFocusedId from "./useFocusedId";
import TabsHeader from "../components/Tabs/TabsHeader";
import { isNumber } from "lodash";

export default (_tabs = [], props, options = { header: true }) => {
  const { focusedId: focusedTabIndex, setFocusedId: setFocusedTabIndex } =
    useFocusedId(0);
  const tabs = useMemo(
    () =>
      _tabs.filter(
        (tab) => !tab?.shouldRenderPropsKey || props[tab.shouldRenderPropsKey]
      ),
    [props, _tabs]
  );

  const header = useMemo(
    () =>
      options?.header && (
        <TabsHeader
          tabs={tabs}
          activeIndex={focusedTabIndex}
          setActiveIndex={setFocusedTabIndex}
        />
      ),
    [tabs, focusedTabIndex]
  );

  useEffect(() => {
    if (isNumber(options?.activeTabIndex)) {
      setFocusedTabIndex(options.activeTabIndex);
    }
  }, [options?.activeTabIndex]);

  const next = useCallback(() => {
    setFocusedTabIndex((index) => (index + 1) % tabs.length);
  });

  const content = useMemo(() => {
    const { Component } = tabs[focusedTabIndex] ?? {};
    return Component && <Component next={next} {...props} />;
  }, [focusedTabIndex, tabs, props, next]);

  return {
    header,
    content,
    next,
    focusedTabIndex,
  };
};
