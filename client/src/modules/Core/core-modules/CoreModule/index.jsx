import React from "react";
import { Route } from "react-router-dom";
import CoreModuleState from "../CoreModuleState";
import { createSelector } from "@reduxjs/toolkit";

class CoreModule {
    constructor({ routes, initialState, name, cells, rootRender, subModules }) {
        this._routes = routes ?? {};
        this.moduleState = new CoreModuleState({
            initialState,
            name,
            cells
        });
        this.name = name;
        this.registerCell = this.registerCell.bind(this);
        this.transformCell = this.transformCell.bind(this);
        this.registerCellSelectors = this.registerCellSelectors.bind(this);
        this.getCoreModuleState = this.getCoreModuleState.bind(this);
        this.rootRender = rootRender;
        this.subModules = subModules;
    }

    get routes() {
        return Object.entries(this._routes).map(([path, Component]) => <Route key={path} path={"/" + path} element={<Component />} />)
    }

    get state () {
        return this.moduleState.register();
    }

    getCoreModuleState (state) {
        return state[this.name];
    }

    registerCellSelectors (_selectors) {
        const selectors = {};
        Object.entries(_selectors).forEach(([name, selector]) => {
            selectors[name] = createSelector(
                this.getCoreModuleState,
                selector,
            );
        });
        return selectors;
    }

    transformCell(_cell) {
        return {
            name: _cell.name,
            action: (payload) => ({
                type: this.name + "/" + _cell.name,
                payload,
            }),
            selectors: this.registerCellSelectors(_cell.selectors),
            sagas: _cell.sagas,
            reducer: _cell.reducer,
        };
    }

    registerCell (_cell) {
        const cell = this.transformCell(_cell);
        this.moduleState.appendCell(cell);
        return cell;
    }
}

export default CoreModule;