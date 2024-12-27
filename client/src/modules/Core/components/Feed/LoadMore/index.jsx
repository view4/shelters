import cx from "classnames";
import Container from "../../ui-kit/Container"
import Button from "../../ui-kit/Button";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import styles from "./styles.module.scss";

const LoadMore = ({ loadMore, className }) => (
    <Container className={cx(styles.container, className)} flex center alignCenter>
        <Button onClick={loadMore} nature='ocean-blue'>
            <span className='chevron-down-container' />
        </Button>
    </Container>
);

export default withShouldRender(LoadMore);