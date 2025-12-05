import { useCallback } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import adminState from "../../state";
import styles from "./styles.module.scss";

const StampInvitationApplicationButton = ({ id, stampInvitationApplication }) => {
    const handleApprove = useCallback(() => {
        if (id) {
            stampInvitationApplication({ id, key: "commenced" });
        }
    }, [id, stampInvitationApplication]);

    const handleDeny = useCallback(() => {
        if (id) {
            stampInvitationApplication({ id, key: "denied" });
        }
    }, [id, stampInvitationApplication]);

    return (
        <Container className={styles.container}>
            <Button 
                onClick={handleApprove}
                disabled={!id}
                nature="primary"
            >
                Approve
            </Button>
            <Button 
                onClick={handleDeny}
                disabled={!id}
                nature="danger"
            >
                Deny
            </Button>
        </Container>
    );
};

export default strappedConnected(
    StampInvitationApplicationButton,
    {},
    {
        stampInvitationApplication: adminState.stampInvitationApplication.action,
    },
    () => ({})
);

