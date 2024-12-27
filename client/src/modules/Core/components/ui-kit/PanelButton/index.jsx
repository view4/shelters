import cx from 'classnames'
import Button from "modules/Core/components/ui-kit/Button"
import Container from "modules/Core/components/ui-kit/Container"
import Text from "modules/Core/components/ui-kit/Text";
import styles from "./styles.module.scss";
// import UserGuideButton from 'modules/Core/sub-modules/Dialog/components/UserGuideButton';

const PanelButton = ({ onClick, text, Component = Button, panel, userGuideKey, widget, gridRow, disabled, className, style, noChevron, ...props }) => (
    <Container flex relative spaceBetween style={style}>
        <Component
            className={cx({
                [styles.btn]: true,
                [styles.disabled]: disabled,
                [className]: Boolean(className)
            })}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            <Text>{text}</Text>
            <span className={cx("chevron-right-container", styles.chevronContainer, { [styles.noChevron]: Boolean(noChevron) })} />
        </Component>
        {/* <UserGuideButton
            userGuideKey={userGuideKey}
            className={styles.guideButton}
        /> */}
    </Container>
);

export default PanelButton