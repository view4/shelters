import CoreModule from "modules/Core/core-modules/CoreModule";
import { MEMBERSHIP } from "./consts";
import MembershipRegistration from "./components/screens/membership-registration";
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
    "/subscribe": MembershipRegistration,
    "/membership/settings": MembershipSettings,
    "/membership/": MyMembershipScreen,
  },
});
