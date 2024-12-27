import CoreModule from "modules/Core/core-modules/CoreModule";
import { DIALOG } from "./consts";
import cells from "./state/cells";
import AppDialog from "./components/AppDialog";
import UserGuideSideBar from "./components/UserGuideSideBar";
import MobileModal from "./components/MobileModal";

const Dialog = new CoreModule({
  name: DIALOG,
  initialState: {
    message: {},
  },
  cells,
  rootRender: () => (
    <>
      <AppDialog />
      <UserGuideSideBar />
      <MobileModal />
    </>
  ),
});

export default Dialog;
