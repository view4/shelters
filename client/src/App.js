import "./App.css";
import "./modules/Core/sub-modules/ui-kit/ui-kit.css";
import booths from "modules/booths";
import { BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { init } from "modules/Core/core-modules";
import timetracker from "modules/timetracker";
import cycles from "modules/cycles";
import roadmaps from "modules/roadmaps";
import Dialog from "modules/Core/sub-modules/Dialog";
import sabbaticals from "modules/sabbaticals";
import entries from "modules/entries";
import trackedTime from "modules/timetracker/submodules/trackedTime";
import auth from "modules/auth";
import payments from "modules/payments";
import membership from "modules/membership";
import shelter from "modules/shelter";
import timemapper from "modules/timemapper";
import mapal from "modules/mapal";
import features from "modules/mapal/submodules/features";
import teachings from "modules/teachings";

const { store, rootRender, routes } = init([
  booths,
  timetracker,
  cycles,
  roadmaps,
  Dialog,
  sabbaticals,
  entries,
  trackedTime,
  auth,
  payments,
  membership,
  shelter,
  timemapper,
  mapal,
  features,
  teachings
]);

const RootWrapper = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>{routes}</Routes>
        {rootRender()}
      </BrowserRouter>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <RootWrapper />
    </Provider>
  );
}

export default App;
