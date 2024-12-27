import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { LOADING } from "../consts";

export default (moduleName) => initCell(
    moduleName,
    {
        name: LOADING,
        reducer: (state, {payload}) => {
            state.isLoading = payload;

        },
        selectors: {
            getIsLoading: (state) => state.isLoading
        },
    }
)