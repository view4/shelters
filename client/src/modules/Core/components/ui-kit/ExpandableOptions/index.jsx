import cx from 'classnames';
import { DownArrow, RemoveCircle, } from "modules/Core/components/ui-kit/indicators";
import Container from "../Container";
import Button from "../Button";
import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import HorizontalOptions from './HorizontalOptions';
import styles from './styles.module.scss';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import { compact } from 'lodash';


const ExpandableOptions = ({ options, className, label, optionsContainerClassName, openClassName }) => {
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
                {isOpen ? <RemoveCircle /> : <DownArrow />}
            </Button>

            <Container className={cx(styles.optionsContainer, optionsContainerClassName)}>
                {compact(options).map(({ text, onClick, Component = Button, props }) => (
                    <Component key={text} onClick={onClick} {...props}>{text}</Component>
                ))
                }
            </Container>
        </Container>
    )
};

export default withRecursiveRender({
    horizontal: HorizontalOptions
}, ExpandableOptions);
