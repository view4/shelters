import cx from 'classnames';
import usePanels from 'modules/Core/hooks/ui-kit/usePanels';
import Screen from '../Screen';
import styles from './styles.module.scss';

const SplitScreen = ({
    panels,
    headerProps,
    commonPanelProps,
    footer,
    appendages,
    footerClassName,
    hideHeader,
    ...props
}) => {
    const {
        jsx,
        headerChildren
    } = usePanels(panels, commonPanelProps);
    
    return (
        <Screen
            headerProps={{
                ...headerProps,
                className: cx(headerProps?.className, styles.header),
                children: !hideHeader && (
                    <>
                        {headerChildren}
                        {headerProps?.children}
                    </>
                ),
            }}
            {...props}
            footerProps={{children: footer, className: cx(footerClassName, styles.footer)}}
        >
            {console.log("props...", headerProps)}
            {jsx}
            {appendages}
        </Screen>
    )

}

export default SplitScreen