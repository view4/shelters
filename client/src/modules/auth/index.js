import CoreModule from "modules/Core/core-modules/CoreModule";
import feed from "./state/feed";
import { AUTH } from "./consts";
import cells from "./state";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Logout from "./components/screens/Logout";
import OnLoad from "./components/OnLoad";

export default new CoreModule({
  name: AUTH,
  initialState: {
    isAuthenticated: null
  },
  cells: {

    login: cells.login,
    register: cells.register,
    validateToken: cells.validateToken,
    logout: cells.logout,
  },
  routes: {
    "login": Login,
    "register": Register,
    "logout": Logout
  },
  rootRender: () => <OnLoad />

});
