import cx from 'classnames';
import Container from 'modules/Core/components/ui-kit/Container';
import { BackNavigation, ForwardNavigation } from './ScreenNavigation';
import SideScreenPanelWidgets from './SideScreenPanelWidgets';
import styles from './styles.module.scss';
import strapped from 'modules/Core/higher-order-components/strapped';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import { useMemo } from 'react';


const ScreenSidePanel = ({ children, className, forward, back, widgets, widgetProps, onDisabledForwardClick }) => (
    <Container
        className={cx(styles.container, className)}
        flex
        col
        center
    >
        <Container className={styles.navContainer}>
            <BackNavigation back={back} />
            <ForwardNavigation forward={forward} onDisabledClick={onDisabledForwardClick} />
        </Container>
        <SideScreenPanelWidgets
            widgets={widgets}
            widgetProps={widgetProps}
        />
        {children}
    </Container>
);

export default strapped(ScreenSidePanel,
    ({ forward }) => {
        const onError = useOnError()
        return {
            onDisabledForwardClick: useMemo(() => (
                forward?.disabled ? () => onError(forward?.restrictionMessage ?? 'Access Denied') : undefined
            ), [forward?.disabled, onError])
        }
    }
);
