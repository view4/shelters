import { isNumber } from 'lodash';

const getShouldRender = (tabIndexFilter, activeIndex) => !(isNumber(tabIndexFilter) && tabIndexFilter != activeIndex)

const SideScreenPanelWidgets = ({ widgets, widgetProps }) => widgets && (
    <>
        {
            widgets?.map(({ Component, gridRow, props, tabIndexFilter }, index) => getShouldRender(tabIndexFilter, widgetProps?.activeTabIndex) &&
                <Component key={index} gridRow={gridRow} {...widgetProps} {...props} />
            )
        }
    </>
);

export default SideScreenPanelWidgets;