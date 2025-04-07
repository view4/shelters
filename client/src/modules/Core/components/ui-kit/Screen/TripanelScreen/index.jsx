import React, { useMemo } from 'react';
import SplitScreen from 'modules/Core/components/ui-kit/SplitScreen'
import Container from 'modules/Core/components/ui-kit/Container';
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
}) => {
    const panels = useMemo(() => {
        return [
            { Component: LeftPanelComponent, width: "25%", props: leftProps, },
            { Component: MainContentComponent, width: "50%", props: {
                children,
                ...mainProps
            }, },
            { Component: RightPanelComponent, width: "25%", props: rightProps, },
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
