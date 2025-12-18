import CoreModule from "modules/Core/core-modules/CoreModule";
import { ADMIN, ADMIN_ROUTES } from "./consts";
import AdminHomeScreen from "./components/screens/AdminHomeScreen";
import AdminInvitationsScreen from "./components/screens/AdminInvitationsScreen";
import AdminSubscriptionsScreen from "./components/screens/AdminSubscriptionsScreen";
import feed from "./state/feed";
import cells from "./state/index";
import AdminAuthenticationScreen from "./components/screens/AdminAuthenticationScreen";
import AdminUsersScreen from "./components/screens/AdminUsersScreen";
import withAdminAuth from "./hocs/withAdminAuth";

export default new CoreModule({
    name: ADMIN,
    initialState: {
        ...feed.getInitialFeedState(),
        isLoading: false,
    },
    cells: {
        fetchFeed: feed.cells?.fetchFeed,
        setFilters: feed.cells?.setFilters,
        stampInvitationApplication: cells.stampInvitationApplication,
        syncSubscriptionPayments: cells.syncSubscriptionPayments,
    },
    routes: {
        [ADMIN_ROUTES.AUTHENTICATION]: withAdminAuth(AdminAuthenticationScreen),
        [ADMIN_ROUTES.INVITATIONS]: withAdminAuth(AdminInvitationsScreen),
        [ADMIN_ROUTES.USERS]: withAdminAuth(AdminUsersScreen),
        [ADMIN_ROUTES.SUBSCRIPTIONS]: withAdminAuth(AdminSubscriptionsScreen),
        [ADMIN_ROUTES.HOME]: withAdminAuth(AdminHomeScreen),
    },  
});
