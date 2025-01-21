import { useMemo } from "react"
import ExpandableCard from "modules/Core/components/ui-kit/Card/ExpandableCard";
import Container from "modules/Core/components/ui-kit/Container";
import Button from 'modules/Core/components/ui-kit/Button';
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import styles from "./styles.module.scss";


const cycle = {
    a: {
        name: "a",
        text: 'gateway a description'
    },
    b: {
        name: "b",
        text: 'gateway b description'
    },
    c: {
        name: "c",
        text: 'gateway c description'
    },
    d: {
        name: "d",
        text: 'gateway d description'
    },
    e: {
        name: "e",
        text: 'gateway e description'
    },
    f: {
        name: "f",
        text: 'gateway f description'
    },
    sabbatical: {
        name: "**Sabbatical**",
        text: 'sabbatical description',
        isSabatical: true
    }
};

const _GatewayCard = ({ gateway, children, ...props }) => {
    return (
        <ExpandableCard {...props} className={styles.gateway} title={gateway.name}>
            {gateway.text}
            {children}
        </ExpandableCard>
    )
};



const SabbaticalGatewayCard = ({ gateway }) => (
    <GatewayCard gateway={gateway} headerProps={{children: "hey hey hey"}}>
        <Container maxWidth flex flexEnd alignCenter p1>
            <Button>
                Complete cycle, and start a new one.
            </Button>
        </Container>
    </GatewayCard>
);

const GatewayCard = withRecursiveRender({
    sabbatical: SabbaticalGatewayCard,
}, _GatewayCard)


const Cycle = () => {
    // Whether to ahndle as feedItem here or not, I think I won't because I want there to be draggability to be honest.
    const gateways = useMemo(() => ([
        cycle.a,
        cycle.b,
        cycle.c,
        cycle.d,
        cycle.e,
        cycle.f,
        cycle.sabbatical
    ]), [cycle?.id]);

    const entities = useMemo(() => gateways.map(gateway => <GatewayCard gateway={gateway} sabbatical={gateway.isSabatical} />), [gateways])

    return (
        <Container className={styles.container}>
            {entities}
        </Container>
    )
};

export default Cycle;