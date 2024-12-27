import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells';
import { SET_FILTERS } from '../consts';
import { INITIAL_FEED_STATE } from '../consts/feed';

export default (moduleName, {nestedFeedKey, nfk=nestedFeedKey }) => initCell(
    moduleName,
    {
        name: SET_FILTERS + `/${nfk}`,
        selectors: {
            getFilters: (state) => state[nfk]?.filters
        },
        reducer: (state, {payload}) => {
            const {reset, ...filters} = payload;
            if (!state[nfk]) {
                state[nfk] = {
                    ...INITIAL_FEED_STATE,
                }
            }
            state[nfk].filters = {
                ...(!reset && state.filters),
                ...filters, 
            }
        },
    }
)