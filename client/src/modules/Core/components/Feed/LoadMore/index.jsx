import cx from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
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