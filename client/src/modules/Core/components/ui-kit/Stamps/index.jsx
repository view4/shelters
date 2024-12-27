import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import Stamp from "modules/Core/components/ui-kit/Stamp";
import styles from "./styles.module.scss";
import { compact } from "lodash";

const Stamps = ({ stamps, className }) => {
    return (
        <Container className={cx(styles.container, className)} flex center alignCenter>
            {compact(stamps ?? [])?.map(({ text, nature, ...props }) => (
                <Stamp stamp={text} nature={nature} {...props} />
            ))}
        </Container>
    )
};

export default Stamps;