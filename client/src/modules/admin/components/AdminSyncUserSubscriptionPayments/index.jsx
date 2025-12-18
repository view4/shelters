import { useCallback } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import adminState from "../../state";

export default strappedConnected(
    Button,
    {
        isLoading: (state) => adminState.syncSubscriptionPayments.selectors.isLoading(state),
    },
    {
        syncSubscriptionPayments: adminState.syncSubscriptionPayments.action,
    },
    ({ userId, syncSubscriptionPayments, isLoading }) => ({
        onConfirm: useCallback((close) => {
            if (userId) {
                syncSubscriptionPayments({ userId, callback: close });
            }
        }, [userId, syncSubscriptionPayments]),
        disabled: !userId || isLoading,
        children: isLoading ? "Syncing..." : "Sync Subscription Payments",
        modal: true,
        copy: {
            title: "Are you sure you want to sync subscription payments?",
            description: "This action will sync all subscription payments for the user.",
            onCancel: "Cancel",
            onConfirm: "Sync",
        },
    })
);

