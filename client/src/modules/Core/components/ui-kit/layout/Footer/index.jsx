import cx from 'classnames';
import Container from 'modules/Core/components/ui-kit/Container'
import styles from './styles.module.scss'
import withShouldRender from 'modules/Core/higher-order-components/withShouldRender';

const Footer = ({ children, className, ...props }) => (
    <Container 
        className={cx(styles.footer, className)} 
        absolute 
        bottom 
        {...props}
    >
        {children}
    </Container>
);

export default withShouldRender(Footer);