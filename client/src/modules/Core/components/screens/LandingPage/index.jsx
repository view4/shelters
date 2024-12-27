import { useMemo } from "react";
import Container from "modules/Core/components/ui-kit/Container";
import TypewriterText from "modules/Core/components/ui-kit/Text/TypewriterText";
import Text from "modules/Core/components/ui-kit/Text";
import microcopy from "./microcopy.json"
import ExternalScreen from "../../ui-kit/Screen/ExternalScreen";
import Cursor from "./Cursor";
import NodeNetwork from "./NodeNetwork";
import strapped from "modules/Core/higher-order-components/strapped";
import useResponsiveness from "modules/Core/hooks/useResponsiveness";
import styles from "./styles.module.scss";

const { typewriter, nodes: _nodes } = microcopy;

const LandingPage = ({ nodes }) => (
    <ExternalScreen className={styles.screen} relative>
        <NodeNetwork nodes={nodes} background />
        <LandingSection />
    </ExternalScreen>
);


const LandingSection = () => (
    <Container className={styles.container}>
        <Container flex center className={styles.title}>
            <TypewriterText statements={typewriter} />
            <Text>4</Text>
            Progress.
        </Container>
        <Cursor />
    </Container>
)

export default strapped(
    LandingPage,
    () => {
        const isMobile = useResponsiveness();
        const nodes = useMemo(() => isMobile ? _nodes.slice(0, 7) : [
            ..._nodes,
        ], [isMobile]);
        return { nodes }
    }
);