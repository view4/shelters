import { useMemo } from 'react';
import Screen from 'modules/Core/sub-modules/ui-kit/components/Screen';
import TabularMainContent from 'modules/Core/sub-modules/ui-kit/components/Screen/TripanelScreen/TabularMainContent';
import useTabs from 'modules/Core/hooks/useTabs';

export const TripanelTabsScreen = ({
    tabs,
    back,
    forward,
    leftWidgets,
    widgetProps: _widgetProps,
    rightWidgets,
    commonPanelProps,
    tabProps,
    header,
    contentHeader,
    headerClassName,
    tabSettings = { header: true },
    ...props
}) => {
    const { content, header: tabsHeader, focusedTabIndex: activeTabIndex } = useTabs(tabs, tabProps, tabSettings);
    const widgetProps = useMemo(() => ({ activeTabIndex, ..._widgetProps }), [_widgetProps, activeTabIndex]);

    const leftProps = useMemo(() => ({
        back,
        widgets: leftWidgets,
        widgetProps
    }), [leftWidgets, back, widgetProps]);

    const rightProps = useMemo(() => ({
        forward,
        widgets: rightWidgets,
        widgetProps,
    }), [forward, rightWidgets, widgetProps]);

    const mainProps = useMemo(() => ({
        header: contentHeader,
        content,
        headerClassName,
        tabsHeader
    }), [contentHeader, activeTabIndex, content, headerClassName, tabsHeader]);

    return (
        <Screen
            {...props}
            tripanel
            MainContentComponent={TabularMainContent}
            commonPanelProps={commonPanelProps}
            header={header}
            mainProps={mainProps}
            leftProps={leftProps}
            rightProps={rightProps}
        />
    )
}

export default TripanelTabsScreen;