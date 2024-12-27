import { createSlice as _createSlice } from '@reduxjs/toolkit';
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
