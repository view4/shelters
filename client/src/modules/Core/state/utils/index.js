import { put } from "redux-saga/effects"

export const getSuccessActionType = (moduleName, actionName) => `${moduleName}/${actionName}Success`

export function* putSuccess(moduleName, actionName, payload) {
    return yield put({
        type: getSuccessActionType(moduleName, actionName), 
        payload
    })
}