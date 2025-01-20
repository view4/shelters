import { compact } from "lodash";
import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import Stamp from "modules/Core/components/ui-kit/Stamp";
import styles from "./styles.module.scss";
import { useMemo } from "react";

const Stamps = ({ stamps={}, className, formatter }) => {
    const refinedStamps = useMemo(() => Boolean(formatter) ? formatter(stamps) : stamps, [stamps, formatter]);
    return (
        <Container className={cx(styles.container, className)} flex center alignCenter>
            {compact(refinedStamps ?? [])?.map(({ text, nature, ...props }) => (
                <Stamp stamp={text} nature={nature} {...props} />
            ))}
        </Container>
    )
};

export default Stamps;