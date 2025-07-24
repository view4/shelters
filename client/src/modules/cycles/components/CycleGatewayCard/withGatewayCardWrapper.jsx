import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import { DownArrow, UpArrow } from "modules/Core/sub-modules/ui-kit/components/indicators";
import styles from "./styles.module.scss";

export default (C) => ({ reorder, hideUp, hideDown, ...props }) => (
    <Container flex alignCenter className={styles.wrapper} >
        <C {...props} />
        <Container>
            <Container className={styles.reorder} col flex center>
                <UpArrow className={hideUp && styles.opaque} onClick={() => reorder(true)} />
                <DownArrow className={hideDown && styles.opaque} onClick={() => reorder(false)} />
            </Container>
        </Container>
    </Container>
)
