import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells'
import { DIALOG } from '../../consts';

const displayUserGuide = initCell(
    DIALOG,
    {
        name: "displayUserGuide",
        reducer: (state, { payload }) => {
            state.userGuide = payload
        },
        select: (state) => state.userGuide,
    }
);

export default displayUserGuide;