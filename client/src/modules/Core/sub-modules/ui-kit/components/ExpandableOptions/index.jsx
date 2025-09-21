import cx from 'classnames';
import { DownArrow, TriDots, RemoveCircle, } from "modules/Core/sub-modules/ui-kit/components/indicators";
import Container from "../Container";
import Button from "../Button";
import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import HorizontalOptions from './HorizontalOptions';

import styles from './styles.module.scss';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import { compact } from 'lodash';


const ExpandableOptions = ({ options, className, label, optionsContainerClassName, openClassName, OpenIndicator = DownArrow, CloseIndicator = RemoveCircle }) => {
    const { isOpen, open, close, toggle } = useIsOpen();

    return (
        <Container
            className={cx(
                styles.container,
                className,
                { [openClassName]: Boolean(isOpen) }
            )}
        >
            <Button onClick={toggle}>
                {label}
                {isOpen ? <CloseIndicator /> : <OpenIndicator />}
            </Button>

            <Container className={cx(styles.optionsContainer, optionsContainerClassName)}>
                {compact(options).map(({ text, onClick, Component = Button, props }) => (
                    <Component key={text} onClick={onClick} {...props}>{text}</Component>
                ))
                }
                {/* {JSON.stringify(options)} */}
            </Container>
        </Container>
    )
};

const TriDotsOptions = ({ 
    options, 
    className, 
    label, 
    optionsContainerClassName, 
    openClassName, 
    OpenIndicator = TriDots, 
    CloseIndicator = RemoveCircle, 
    horizontal=true,
    optionsOrigin = 'right'
 }) => (
    <ExpandableOptions
        options={options}
        className={cx(styles.tridot, { 
            [styles.horizontal]: horizontal,
            [styles.optionsOriginRight]: optionsOrigin === 'right',
            [styles.optionsOriginLeft]: optionsOrigin === 'left'
        }, className)}
        label={label}
        optionsContainerClassName={optionsContainerClassName}
        openClassName={cx(styles.open, openClassName)}
        OpenIndicator={OpenIndicator}
        CloseIndicator={CloseIndicator}
    />
)

export default withRecursiveRender({
    horizontal: HorizontalOptions,
    "tridot": TriDotsOptions
}, ExpandableOptions);
