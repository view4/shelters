import CoreModule from "modules/Core/core-modules/CoreModule";
import UIKitDocs from "./UIKitDocs";

export default new CoreModule({
  name: "UI_KIT",
  initialState: {},
  routes: {
    "/ui-kit": UIKitDocs,
    "/ui-kit/docs": UIKitDocs,
  },
}); 