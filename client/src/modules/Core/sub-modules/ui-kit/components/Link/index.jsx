import cx from "classnames";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import { useNavigate } from "react-router-dom";
import strapped from "modules/Core/higher-order-components/strapped";
import LinkCard from "./LinkCard";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import { openInNewTab } from "modules/Core/utils/window";
// import withTracking from "modules/Core/higher-order-components/withTracking";
import styles from "./styles.module.scss";
// import { TRACKING_TRIGGERS } from "modules/Core/sub-modules/Tracking/consts";
import { useCallback } from "react";


export const LinkComponent = ({ to, text, className, navigate, children, hover = true, onClick }) => {
    const handleOnClick = useCallback((e) => {
        if (onClick) onClick(e);
        navigate(to);
    }, [onClick, navigate, to]);

    return (
        <Text
            className={cx(styles.link, className, { [styles.hover]: hover })}
            bold
            onClick={handleOnClick}
        >
            {text ?? children}
        </Text>
    )
};

export const Link = strapped(
    LinkComponent,
    ({ external }) => {
        const navigate = useNavigate();
        return {
            navigate: external ? openInNewTab : navigate
        }
    }
);

// const TrackedLink = ({ tracking, ...props }) => withTracking(
//     Link,
//     { name: tracking?.name, trigger: TRACKING_TRIGGERS.ON_CLICK },
//     tracking?.staticProps,
//     tracking?.useParseParams
// )(props);

export default withRecursiveRender({
    // tracking: TrackedLink,
    card: LinkCard,
}, Link)