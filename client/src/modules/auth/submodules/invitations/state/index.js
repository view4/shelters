import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import middleware from "../middleware";
import { INVITATIONS } from "../consts";

export default {
  validateInvitation: initCell(INVITATIONS, {
    name: "validateInvitation",
    sagas: {
      latest: function* ({ payload: { email, linkId } }) {
        return yield call(middleware.ops.validateInvitation, email, linkId);
      },
    },
  }),
  acceptInvitation: initCell(INVITATIONS, {
    name: "acceptInvitation",
    sagas: {
      latest: function* ({ payload: { email, linkId } }) {
        return yield call(middleware.ops.acceptInvitation, email, linkId);
      },
    },
  }),
}