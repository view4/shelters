import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { SABBATICALS } from "../consts";

export default new MiddlewareModule({
  name: SABBATICALS,
  operations: {
    completeSabbatical: `
            mutation endSabbatical($startNewCycle: Boolean) {
                endSabbatical(startNewCycle: $startNewCycle) 
            }
        `,
  },
});
