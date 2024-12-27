import { all, takeEvery, takeLatest } from "redux-saga/effects";

import { createSlice, progenitorsToReducers } from "./utils";

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
    yield all(
      Object.entries(this.cells)?.map(([name, progenitor]) => {
        if (!progenitor.sagas) return null;
        return takeLatest(
          `${this.coreModuleName}/${name}`,
          progenitor.sagas.latest
        );
      })
    );
  }
}

export default CoreModuleState;
