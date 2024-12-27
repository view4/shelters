import CoreModule from "modules/Core/core-modules/CoreModule";
import { SABBATICALS } from "./consts";
import cells from "./state/index";

export default new CoreModule({
    name: SABBATICALS,
    initialState: {},
    cells: {
        completeSabbatical: cells.completeSabbatical,
    },

})