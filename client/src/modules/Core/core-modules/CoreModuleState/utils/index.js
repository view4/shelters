import { createSlice as _createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
export const createSlice = (name, initialState, reducers) => _createSlice({
    name,
    initialState,
    reducers
});

export const progenitorsToReducers = (progenitors) => {
    const reducers = {};
    Object.entries(progenitors).map(([name, progenitor]) => {
        if(progenitor?.reducer) reducers[name] = progenitor.reducer;
        if (progenitor?.successCell?.reducer){
            reducers[name + "Success"] = progenitor.successCell.reducer;
        }
    });
    return reducers;
}

export const progenitorsToSagas = (moduleName, progenitors) => {
    const sagas = [];
    Object.entries(progenitors).forEach(([name, progenitor]) => {
        // Add main progenitor sagas
        console.log("progenitor", progenitor, name)
        if (progenitor?.sagas) {
            Object.entries(progenitor.sagas).forEach(([sagaName, saga]) => {
                if (sagaName === 'latest') {
                    sagas.push(takeLatest(
                        `${moduleName}/${name}`,
                        saga
                    ));
                } else {
                    sagas.push(takeLatest(
                        `${moduleName}/${name}${sagaName.charAt(0).toUpperCase() + sagaName.slice(1)}`,
                        saga
                    ));
                }
            });
        }
    });
    return sagas.filter(Boolean);
}