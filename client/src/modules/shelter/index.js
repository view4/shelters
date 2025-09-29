import CoreModule from "modules/Core/core-modules/CoreModule";
import { SHELTER } from "./consts";
import LandingPage from "./components/screens/LandingPage";
import ContactPage from "./components/screens/ContactPage";
import PoliciesPage from "./components/screens/PoliciesPage";

export default new CoreModule({
  name: SHELTER,
  initialState: {},
  cells: {},
  routes: {
    "/homepage": LandingPage,
    "/contact": ContactPage,
    "/policies": PoliciesPage,
  },
});
