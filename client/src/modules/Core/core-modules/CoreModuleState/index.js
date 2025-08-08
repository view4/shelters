import { all, takeEvery, takeLatest } from "redux-saga/effects";

import { createSlice, progenitorsToReducers, progenitorsToSagas } from "./utils";

class CoreModuleState {
  constructor({ name, initialState, cells = {} }) {
    this.coreModuleName = name;
    this.cells = cells;
    this.initialState = initialState;
    this.getSagas = this.getSagas.bind(this);
  }

  register = () => {
    const sagas = this.getSagas;
    return { name: this.coreModuleName, sagas };
  };

  appendCell = (cell) => {
    this.cells[cell.name] = cell;
  };

  get slice() {
    return createSlice(
      this.coreModuleName,
      this.initialState,
      progenitorsToReducers(this.cells)
    );
  }

  get name() {
    return this.coreModuleName;
  }

  *getSagas() {
    const sagas = progenitorsToSagas(this.coreModuleName, this.cells);
    yield all(sagas)

  }
}

export default CoreModuleState;
