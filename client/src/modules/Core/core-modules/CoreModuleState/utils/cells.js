import { createSelector } from "@reduxjs/toolkit";
import { isString, noop } from "lodash";
import { getSuccessActionType } from "modules/Core/state/utils";
import { compactObject } from "modules/Core/utils/obj";
import { put } from "redux-saga/effects";

export const registerCellSelector = (moduleName, selector) =>
  selector && createSelector((state) => state[moduleName], selector);

const registerCellSelectors = (moduleName, cell = {}) => {
  const selectors = {};
  Object.entries(cell.selectors ?? {}).forEach(([name, selector]) => {
    selectors[name] = createSelector((state) => state[moduleName], selector);
  });
  return selectors;
};

// Consider - finding better way than this (import from there does not work - maybe handle when initing module or something - it's not clear - but yeah).
const onSuccessAction = (message) => ({
  type: "dialog/dialog",
  payload: {
    type: "success",
    message,
  },
});

const onErrorAction = (message) => ({
  type: "dialog/dialog",
  payload: {
    type: "error",
    message,
  },
});

const sagaWrapper = (
  saga,
  onSuccess,
  onError,
  processSuccess,
  onCellSuccessAction
) =>
  function* ({ payload, ...args }) {
    try {
      const res = yield saga({ payload });
      payload?.callback?.(res);
      if (!processSuccess(res)) return;
      if (onCellSuccessAction) yield put(onCellSuccessAction(res));
      if (isString(onSuccess)) return yield put(onSuccessAction(onSuccess));
      if (onSuccess) yield onSuccess(res, payload);
    } catch (e) {
      console.log("ERROR: ", e);
      if (!onError) {
        console.error(
          "No onError handler specified for saga",
          saga,
          "with payload",
          payload,
          "and error",
          e
        );
        return;
      }
      if (isString(onError)) return yield put(onErrorAction(onError));
      yield onError(e);
    }
  };

export const initSagas = (
  {
    latest,
    onSuccess,
    onError,
    processSuccess = (res) => Boolean(res),
    throttle,
    throttleTime,
  },
  onCellSuccess
) =>
  compactObject({
    latest:
      latest &&
      sagaWrapper(latest, onSuccess, onError, processSuccess, onCellSuccess),
    throttle:
      throttle &&
      sagaWrapper(throttle, onSuccess, onError, processSuccess, onCellSuccess),
  });

export const initCell = (moduleName, cell) => {
  const onSuccess = (payload) => ({
    type: getSuccessActionType(moduleName, cell.name),
    payload,
  });

  return {
    ...cell,
    name: cell.name,
    action:
      cell.action ??
      ((payload) => ({
        type: moduleName + "/" + cell.name,
        payload,
      })),
    selectors: registerCellSelectors(moduleName, cell),
    sagas:
      cell.sagas &&
      initSagas(cell.sagas, cell?.sagas?.onCellSuccess && onSuccess),
    reducer: cell.reducer,
    select: cell.select && registerCellSelector(moduleName, cell.select),
    onSuccess,
    successCell: cell.successCell,
  };
};
