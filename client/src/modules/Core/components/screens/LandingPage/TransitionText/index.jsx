import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import Text from "modules/Core/components/ui-kit/Text";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";


const TransitionHeader = () => {
    const [classNames, setClassNames] = useState([styles.headerTransition])

    const cycle = useCallback(() => {
        setTimeout(() => {
            setClassNames([styles.headerTransition, styles.headerTransitionActive])
        }, 500)

        setTimeout(() => {
            setClassNames([styles.headerTransition, styles.headerTransitionActive, styles.phase2])
        }, 1000)

        setTimeout(() => {
            setClassNames([styles.headerTransition])
        }, 3000)
    }, );

    useOnLoad(() => {
        cycle();
    });
    return (
        <Container onClick={cycle} className={cx(styles.container, ...classNames)}>
            <Text text={"People"} />
            <Text text={"4"} />
            <Text text={"Progress"} />
        </Container>
    )
};

export default TransitionHeader;