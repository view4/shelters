import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { ROADMAPS } from "../consts";
import middleware from "../middleware";
import stampEntityCell from "modules/Core/state/reusableCells/stampEntityCell";
import { merge } from "lodash";
import { arrayToObject } from "modules/Core/core-modules/CoreModuleState/utils/helpers";

export default {
  stampGateway: stampEntityCell(ROADMAPS, {
    requestHandler: middleware.ops.stampEntity,
    name: "stampGateway"
  }),
  setEntities: initCell(ROADMAPS, {
    requestHandler: middleware.ops.initGatewayEntities,
    name: "setEntities",
    reducer: (state, action) => {
      state.entities = merge({}, state.entities, arrayToObject(action.payload));
    }
  })
};
