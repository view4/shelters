import React, { useMemo } from 'react';
import SplitScreen from 'modules/Core/sub-modules/ui-kit/components/SplitScreen'
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import styles from './styles.module.scss'
import ScreenSidePanel from '../ScreenSidePanel';

const TripanelScreen = ({
    LeftPanelComponent = ScreenSidePanel,
    RightPanelComponent = ScreenSidePanel,
    MainContentComponent = Container,
    leftProps,
    rightProps,
    tripanel,
    mainProps,
    children,
    ...props
    // Consider making jsut actions in the content there fo the left and right section. 
    // There can be the main content or something as children which I think makes some sense. 
    // maybe this requires some more thught. 
}) => {
    const panels = useMemo(() => {
        return [
            { Component: LeftPanelComponent, width: "25%", props: leftProps, },
            {
                Component: MainContentComponent, width: Boolean(RightPanelComponent) ? "50%" : "75%", props: {
                    children,
                    ...mainProps
                },
            },
            { Component: RightPanelComponent, width: Boolean(RightPanelComponent) ? "25%" : "0%", props: rightProps, },
        ]
    }, [LeftPanelComponent, RightPanelComponent, MainContentComponent, rightProps, leftProps, mainProps]);

    return (
        <SplitScreen
            panels={panels}
            className={styles.screen}
            {...props}
        />
    )
}

export default TripanelScreen;
