import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import { all } from "redux-saga/effects";
import _ from 'lodash';

const initSagas = (modules) => {
    const sagaMiddleware = createSagaMiddleware();
    function* combinedSagas() {
        yield all(modules.map((coreModule) => {
            return coreModule?.state?.sagas()
        }))
    }

    return [sagaMiddleware, combinedSagas];
}

const rootRender = (modules) => {
    return <>
        {modules.map((m) => m.rootRender?.())}
    </>
}

export const init = (_modules = []) => {
    const modules = _modules.reduce((modules, module) => module.subModules ? modules.concat(module.subModules) : modules, [..._modules])
    const routes = modules.reduce((routes, coreModule) => routes.concat(coreModule.routes ?? []), []);
    const [sagaMiddleware, sagas] = initSagas(modules);
    const store = configureStore({
        reducer: modules.reduce((reducers, coreModule) => {
            const state = coreModule.moduleState.slice;
            reducers[state.name] = state.reducer
            return reducers;
        }, {}),
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: false,
                immutableCheck: false,
                serializableCheck: false
            }).concat(sagaMiddleware),
    })
    sagaMiddleware.run(sagas);
    return {
        store,
        routes,
        rootRender: () => rootRender(modules)
    }

}