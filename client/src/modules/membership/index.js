import CoreModule from "modules/Core/core-modules/CoreModule";
import { MEMBERSHIP } from "./consts";
import MembershipRegistration from "./components/screens/membership-registration";
import MembershipRegistrationSuccess from "./components/screens/membership-registration-success";
import cells from "./state/index";
import MembershipSettings from "./components/screens/membership-settings";
import feed from "./state/feed";
import MyMembershipScreen from "./components/screens/my-membership-screen";

export default new CoreModule({
  name: MEMBERSHIP,
  initialState: {},
  cells: {
    cancelMembership: cells.cancelMembership,
    fetchFeed: feed.cells?.fetchFeed,
    setFilters: feed.cells?.setFilters,
  },
  routes: {
    "/subscribe/success": MembershipRegistrationSuccess,
    "/subscribe": MembershipRegistration,
    "/membership/settings": MembershipSettings,
    "/membership/": MyMembershipScreen,
  },
});
