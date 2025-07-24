import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import CompleteSabbaticalButton from "modules/sabbaticals/components/CompleteSabbaticalButton";
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp";
import Component from "../component";
import styles from "./styles.module.scss";

export default ({ gateway = {}, refetch }) => (
    <Component
        className={styles.sabbaticalGateway}
        gateway={gateway}
        refetch={refetch}
        headerProps={{ appendage: <Stamp nature={"success_street"} stamp="Sabbatical" /> }}
    >
        <Container maxWidth flex alignCenter p1>
            <CompleteSabbaticalButton
                shouldRender={Boolean(gateway?.stamps?.commenced) && Boolean(gateway?.stamps?.completed)} />
        </Container>
    </Component>
);
