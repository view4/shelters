import React, { useCallback } from 'react';
import c from 'classnames';
import { Button as __Button } from '@mui/material';
import withUIKitClasses from 'modules/Core/higher-order-components/withUIKitClasses';
import Loader from '../Loader';
import RestrictedButton from '../RestrictedButton';
import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import ClickableCard from './ClickableCard';
import RedirectButton from '../RedirectButton';
import PanelButton from '../PanelButton';
import WidgetButton from '../Widget/WidgetButton';
import ModalButton from './ModalButton';
import styles from './styles.module.scss';


const _Button = ({ onClick, children, active, nature = "grey-blue", className, text, rightIndicator, loading, hover = true, ...props }) => (
    <__Button
        onClick={onClick}
        className={c(styles.btn_base, className, styles[nature], { [styles.hover]: hover, [styles.active]: active })}
        disabled={loading}
        endIcon={rightIndicator}
        {...props}
    >
        <Loader loading={loading} size={"1rem"} className={styles.loader}>
            {children ?? text}
        </Loader>
    </__Button>
);

const Button = ({ restrictionSelector, ...props }) => {
    if (Boolean(restrictionSelector)) {
        return <RestrictedButton restrictionSelector={restrictionSelector}  {...props} />
    }
    return <_Button {...props} />
};

const DownloadButton = ({ download, ...props }) => {
    const onClick = useCallback(() => {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.href = download;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [download]);

    return <Button  {...props} onClick={onClick} />
}

const UIButton = withUIKitClasses(Button);

export default withRecursiveRender({
    card: ClickableCard,
    to: RedirectButton,
    widget: WidgetButton,
    download: DownloadButton,
    panel: PanelButton,
    modal: ModalButton
}, UIButton);