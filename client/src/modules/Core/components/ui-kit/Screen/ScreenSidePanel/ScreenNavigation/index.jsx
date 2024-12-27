import cx from 'classnames';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ConditionalContainer from '../../../ConditionalContainer';
import Button from '../../../Button';
import styles from './styles.module.scss';

export const BackNavigation = ({ back, className }) => {
    const navigate = useNavigate();
    const onWrapperClick = useMemo(() => back?.navigate && (() => navigate(back?.navigate)), [back?.navigate, navigate])
    return (
        <ScreenNavigation
            className={cx(styles.backContainer, className)}
            dir='left'
            text={back?.text}
            to={back?.to}
            onWrapperClick={onWrapperClick}
        />
    )
};

export const ForwardNavigation = ({ forward, onDisabledClick }) => (
    <ScreenNavigation
        onWrapperClick={forward?.disabled && onDisabledClick}
        className={styles.forwardContainer}
        dir='right'
        text={forward?.text}
        to={forward?.to}
        disabled={forward?.disabled}
    />
);

const ScreenNavigation = ({ to, dir, text, className, onWrapperClick, ...props }) => (
    <Navigation
        className={className}
        shouldRender={Boolean(to || onWrapperClick)}
        onClick={onWrapperClick}
        to={to}
        dir={dir}
        {...props}
    >
        {text}
    </Navigation>
)

export const Navigation = ({ className, shouldRender, onClick, dir, children, ...props }) => (
    <ConditionalContainer
        className={className}
        shouldRender={shouldRender}
        onClick={onClick}
    >
        <Button {...props}>
            <span className={`chevron-${dir}-container`} />
            {children}
        </Button>
    </ConditionalContainer>
)


export default ScreenNavigation;
