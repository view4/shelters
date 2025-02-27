import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { call } from "redux-saga/effects";
import middleware from "../middleware";
import { login, getToken, logout, register } from "../utils";
import { deleteToken, saveToken } from "modules/Core/utils/auth";

export default {
  login: initCell("login", {
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
  register: initCell("register", {
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
  validateToken: initCell("validateToken", {
    selector: (state) => state.user,
    selectors: {
      isAuthed: (state) => state.isAuthed,
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
        return user;
      },
      onCellSuccess: true,
    },
    successCell: {
      reducer: (state, { payload }) => {
        state.user = payload;
        isAuthenticated = Boolean(user?.id);
      },
    },
  }),
  logout: initCell("logout", {
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
