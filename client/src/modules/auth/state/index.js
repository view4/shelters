import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { call } from "redux-saga/effects";
import middleware from "../middleware";
import { login, getToken, logout, register } from "../utils";
import { deleteToken, saveToken } from "modules/Core/utils/auth";
import { AUTH } from "../consts";

export default {
  login: initCell(AUTH, {
    name: "login",
    sagas: {
      latest: function* ({ payload: { email, password } }) {
        const res = yield call(login, email, password);
        if (!res.user) {
          throw new Error("Invalid credentials");
        }
        return res.user;
      },
      onCellSuccess: true,
    },
  }),
  register: initCell(AUTH, {
    name: "register",
    sagas: {
      latest: function* ({ payload: { email, password } }) {
        const res = yield call(register, email, password);
        if (!res.user) {
          throw new Error("Invalid credentials");
        }
        return res.user;
      },
      onCellSuccess: true,
    },
  }),
  validateToken: initCell(AUTH, {
    name: "validateToken",
    selector: (state) => state.user,
    selectors: {
      isAuthed: (state) => state.isAuthed,
      membership: (state) =>
        state.user?.membership || state.user?.membership || {},
      hasActiveMembership: (state) => state.user?.membership?.isActive || false,
      boothCount: (state) => state.user?.boothCount || 0,
    },
    sagas: {
      latest: function* ({ payload: { user } }) {
        const token = call(getToken, user);
        // maybe get token
        if (!token) {
          throw new Error("Invalid token");
        }
        saveToken(token);
        const res = yield call(middleware.ops.validateToken);
        if (!res.user) return false;
        return res.user;
      },
      onCellSuccess: true,
    },
    successCell: {
      reducer: (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = Boolean(payload?.id);
      },
    },
  }),
  logout: initCell(AUTH, {
    name: "logout",
    reducer: (state) => {
      state.user = null;
    },
    sagas: {
      latest: function* () {
        yield call(logout);
        deleteToken();
      },
      onCellSuccess: true,
    },
  }),
};
