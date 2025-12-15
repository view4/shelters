import { useCallback } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import adminState from "../../state";

// const AdminSyncUserSubscriptionPayments = ({ userId, syncSubscriptionPayments, isLoading }) => {
//     const handleSync = useCallback(() => {
//         if (userId) {
//             syncSubscriptionPayments({ userId });
//         }
//     }, [userId, syncSubscriptionPayments]);

//     return (
//         <Container>
//             <Button 
//                 onClick={handleSync}
//                 disabled={!userId || isLoading}
//             >
//                 {isLoading ? "Syncing..." : "Sync Subscription Payments"}
//             </Button>
//         </Container>
//     );
// };

export default strappedConnected(
    Button,
    {
        isLoading: (state) => adminState.syncSubscriptionPayments.selectors.isLoading(state),
    },
    {
        syncSubscriptionPayments: adminState.syncSubscriptionPayments.action,
    },
    ({ userId, syncSubscriptionPayments, isLoading }) => ({
        onConfirm: useCallback(() => {
            if (userId) {
                syncSubscriptionPayments({ userId });
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

