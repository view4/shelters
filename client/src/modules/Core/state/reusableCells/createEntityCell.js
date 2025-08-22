import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells';
import { call, put } from 'redux-saga/effects';
import { CREATE_ENTITY } from '../consts';
import { putSuccess } from '../utils';
import { onError, onSuccess as onSuccessAction } from 'modules/Core/sub-modules/Dialog/state/cells';

const defaultParseRes = (res) => res?.entity;
export default (moduleName, { requestHandler, parseRes = defaultParseRes, onErrorMessage, onSuccess, successMessage, name = CREATE_ENTITY, ...args } = {}) => initCell(
    moduleName,
    {
        name,
        selectors: {
            getIsLoading: (state) => state.isLoading
        },
        reducer: (state, payload) => {
            state.isLoading = true;
        },
        sagas: {
            latest: function* ({ payload: { callback, id, ...payload } }) {
                let res = yield call(requestHandler, {...payload, id})
                res = parseRes?.(res) ?? res;
                yield putSuccess(moduleName, name, res)
                callback?.(res) 
                return res;
            },
            onError: onErrorMessage && function* () {
                yield put(onError(onErrorMessage))
            },
            onSuccess: (onSuccess || successMessage) && function* (...args) {
                if (successMessage) yield put(onSuccessAction(successMessage))
                if (onSuccess) yield onSuccess(...args)
            },
        },
        successCell: {
            reducer: (state, payload) => {
                state.isLoading = false;
            },
            sagas: {
                latest: function* ({ payload: { callback, id, ...payload } }) {
                    if (onSuccess) yield onSuccess(...args)
                }
            }
        },
        ...(args || {})
    },
)