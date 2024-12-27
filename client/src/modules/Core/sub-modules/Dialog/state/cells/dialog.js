import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells'
import { DIALOG } from '../../consts';

const dialog = initCell(
    DIALOG,
    {
        name: "dialog",
        reducer: (state, { payload }) => {
            state.message = payload
        },
        select: (state) => state.message,
    }
);

export default dialog;