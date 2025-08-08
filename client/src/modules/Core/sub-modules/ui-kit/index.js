import CoreModule from "modules/Core/core-modules/CoreModule";
import UIKitDocs from "./UIKitDocs";
// import DynamicUIKitDocs from "./DynamicUIKitDocs";
import UIKitHomeScreen from "./components/screens/home";
import ComponentDocsScreen from "./components/screens/component-docs";

const UI_KIT = "UI_KIT";

const UIKit = new CoreModule({
  name: UI_KIT,
  initialState: {},
  routes: {
    "/ui-kit": UIKitHomeScreen,
    "/ui-kit/docs": UIKitDocs,
    // "/ui-kit/dynamic": DynamicUIKitDocs,
    "/ui-kit/components/*": ComponentDocsScreen,
  },
});

export default UIKit; 