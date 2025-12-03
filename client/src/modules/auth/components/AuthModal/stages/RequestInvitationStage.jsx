import React from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import CreateSelfInvitationRequest from "modules/auth/submodules/invitations/components/CreateSelfInvitationRequest";
import styles from "../styles.module.scss";

export default ({ email, onSuccess }) => {
    return (
        <Container className={styles.form}>
            <Text className={styles.requestText}>
                We couldn't find a valid invitation for this email. 
                Please request an invitation below and we'll review your application.
            </Text>
            <CreateSelfInvitationRequest 
                email={email}
                onSuccess={onSuccess}
                close={() => {}}
            />
        </Container>
    );
};

