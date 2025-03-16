import CoreModule from "modules/Core/core-modules/CoreModule";
import { SHELTER } from "./consts";
import LandingPage from "./components/screens/LandingPage";

export default new CoreModule({
  name: SHELTER,
  initialState: {
  },
  cells: {
  },
  routes: {
    "/shelter": LandingPage
  },
});
