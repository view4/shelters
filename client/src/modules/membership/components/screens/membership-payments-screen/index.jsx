import { useCallback } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import auth from "modules/auth/state";
import PaymentsFeed from "../../PaymentsFeed";
import { PAYMENTS } from "modules/payments/consts";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp";
import cells from "modules/membership/state/index";
import BoothScreen from "modules/shelter/components/BoothScreen";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import styles from "./styles.module.scss";

const { cancelMembership } = cells;

const CancelSubscriptionButton = strappedConnected(Button, {}, { cancelMembership: cancelMembership.action }, ({ cancelMembership, onSuccess }) => ({
    onConfirm: (close) => cancelMembership({ callback: () => {
        close();
        onSuccess();
    } }),
    text: "Cancel Subscription",
    className: styles.cancelButton,
    modal: true,
    copy: {
        title: "Are you sure you want to cancel your subscription?",
        description: "This action will cancel your subscription and you will no longer have access to your membership.",
        onCancel: "Back",
        onConfirm: "Cancel Subscription",
    },
}));

const Component = ({ userId, onCancelSuccess, isCancelled, cancelledDate }) => (
    <BoothScreen
        header="My Subscription"
        infoKey={PAYMENTS.feed}
    >
        <Container className={styles.headerContainer}>
            <BoothsScreenHeader
                header="My Payments"
                infoKey={PAYMENTS.feed}
                className={styles.header}
                options={!isCancelled && [
                     { Component: CancelSubscriptionButton, props: { userId, className: styles.cancelButton, onSuccess: onCancelSuccess } },
                ]}
            />
            {isCancelled && (
                <Stamp 
                    stamp="Subscription Cancelled" 
                    timestamp={cancelledDate}
                    className={styles.cancelledStamp}
                />
            )}
        </Container>
        <PaymentsFeed userId={userId} />
    </BoothScreen>
);


export default strappedConnected(
    Component,
    {
        user: auth.validateToken.selector,
    },
    {
        refetch: auth.validateToken.action,
    },
    ({ user, refetch }) => {
        const success = useOnSuccess();
        const onCancelSuccess = useCallback((result) => {
            if (Boolean(result)) {
                success("Subscription cancelled successfully");
                refetch();
            }
        }, [success, refetch]);
        return {
            userId: user?.id,
            onCancelSuccess,
            isCancelled: Boolean(user?.membership?.stamps?.completed),
            cancelledDate: user?.membership?.stamps?.completed
        }
    }
)