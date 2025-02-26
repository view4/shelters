import CoreModule from "modules/Core/core-modules/CoreModule";
import { MEMBERSHIP } from "./consts";
import MembershipRegistration from "./components/screens/membership-registration";
import cells from "./state/index";
import MembershipSettings from "./components/screens/membership-settings";

export default new CoreModule({
  name: MEMBERSHIP,
  initialState: {},
  cells: {
    cancelMembership: cells.cancelMembership,
  },
  routes: {
    "/membership": MembershipRegistration,
    "/membership/settings": MembershipSettings,
  },
});
