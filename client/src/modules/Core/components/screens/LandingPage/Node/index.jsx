import cx from "classnames";
import Title from "modules/Core/components/ui-kit/Title";
import Text from "modules/Core/components/ui-kit/Text";
import RedirectButton from "modules/Core/components/ui-kit/RedirectButton";
import Container from "modules/Core/components/ui-kit/Container";
import styles from "./styles.module.scss";
import { useMemo } from "react";

const Node = ({ node, x, y, opacity, isFocused, onClick, size, sizeRem, nature }) => {
    const s  = useMemo(() =>  sizeRem && {
        height: `${sizeRem}rem`,
        width: `${sizeRem}rem`,
    }, [sizeRem]);

    return (
        <Container
            className={cx(
                styles.node,
                isFocused && styles.open,
                styles[node?.size ?? "medium"],
                styles[size],
                nature && styles[nature],
                styles[node?.kind]
            )}
            onClick={onClick}
            style={{
                bottom: y + "vh",
                left: x + "vw",
                opacity: isFocused ? 1 : opacity / 100,
                ...s
            }}
        >
            <Container>
                <Container className={styles.textContentContainer}>
                    <Title Element="h4">{node.title}</Title>
                    <Text>{node.content}</Text>
                </Container>
                <RedirectButton to={"/register"} nature={false} className={cx(styles.btn)}>Join the Network</RedirectButton>
            </Container>
            <Container className={styles.elipsis} />
            <Container className={styles.elipsis} />
            <Container className={styles.elipsis} />
            <Container className={styles.elipsis} />
        </Container>
    );
}

export default Node;