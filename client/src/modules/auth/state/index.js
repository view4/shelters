import { initCell } from "modules/Core/core-modules/CoreModuleState/utils/cells";
import { call, put } from "redux-saga/effects";
import middleware from "../middleware";
import { login, getToken, logout, register } from "../utils";
import { deleteToken, saveToken } from "modules/Core/utils/auth";
import { AUTH } from "../consts";
import { onError } from "modules/Core/sub-modules/Dialog/state/cells";

export default {
  login: initCell(AUTH, {
    name: "login",
    sagas: {
      latest: function* ({ payload: { email, password } }) {
        try {
          const res = yield call(login, email, password);
          if (!res.user) {
            throw new Error("Invalid credentials");
          }
          return res.user;
        } catch (error) {
          console.log(error);
          yield put(onError("Invalid credentials"));
          return false;
        }
      },
      onCellSuccess: true,
    },
    successCell: {
      reducer: (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = Boolean(payload?.uid);
      },
    },
  }),
  register: initCell(AUTH, {
    name: "register",
    sagas: {
      latest: function* ({ payload: { email, password } }) {
        const res = yield call(register, email, password);
        if (!res.user) {
          yield put(onError("Failed to Register"));

          throw new Error("Invalid credentials");
        }
        return res.user;
      },
      onCellSuccess: true,
    },
    successCell: {
      reducer: (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = Boolean(payload?.uid);
      },
    }
  }),
  validateToken: initCell(AUTH, {
    name: "validateToken",
    selector: (state) => state.user,
    selectors: {
      isAuthed: (state) => {
        console.log({ state: state.isAuthenticated })
        return state.isAuthenticated
      },
      membership: (state) =>
        state.user?.membership || state.user?.membership || {},
      hasActiveMembership: (state) => state.user?.membership?.isActive || false,
      boothCount: (state) => state.user?.boothCount ?? 0,
      email: (state) => state.user?.email || "",
    },
    sagas: {
      latest: function* ({ payload: { user } }) {
        // maybe get token
        if (!user?.accessToken) {
          throw new Error("Invalid token");
        }
        saveToken(user?.accessToken);
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
