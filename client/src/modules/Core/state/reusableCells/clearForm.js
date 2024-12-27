import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells';
import {CLEAR_FORM } from '../consts';

export default (moduleName, {onErrorMessage } = {}) => initCell(
    moduleName,
    {
        name: CLEAR_FORM,
        selectors: {
            getForm: (state) => state.form
        },
        reducer: (state, {payload}) => {
            state.form = {};
        },
    }
)