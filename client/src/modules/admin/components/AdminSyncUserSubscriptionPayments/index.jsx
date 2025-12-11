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
    () => ({
        onClick: useCallback(() => {
            if (userId) {
                syncSubscriptionPayments({ userId });
            }
        }, [userId, syncSubscriptionPayments]),
        disabled: !userId || isLoading,
        children: isLoading ? "Syncing..." : "Sync Subscription Payments",
    })
);

