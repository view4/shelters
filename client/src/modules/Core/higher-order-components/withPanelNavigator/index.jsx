import cx from "classnames";
import withShouldRender from "../withShouldRender";
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import { CHEVRON_RIGHT_CX } from 'modules/Core/styles/consts';
import RedirectButton from 'modules/Core/sub-modules/ui-kit/components/RedirectButton';
import styles from './styles.module.scss';

const NavigatorComponent = ({ to, getTo, direction, className, restrictionSelector, ...props }) => (
    <RedirectButton
        className={cx(styles.btn, styles[direction], className)}
        restrictionSelector={restrictionSelector}
        to={to ?? getTo?.(props)}
        {...props}
    >
        <span className={CHEVRON_RIGHT_CX} />
    </RedirectButton>
)
export const Navigator = withShouldRender(NavigatorComponent);

export default (Component, direction, { getRestrictionSelector, className, Button = RedirectButton, getTo, ...redirectProps }, containerProps) => (props) => (
    <Container relative {...containerProps}>
        <Component {...props} />
        <Navigator
            direction={direction}
            className={className}
            Button={Button}
            restrictionSelector={props?.restrictionSelector ?? getRestrictionSelector?.(props)}
            getTo={getTo}
            {...props}
            {...redirectProps}
        />

    </Container>
);