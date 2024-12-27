import "./App.css";
import "./modules/Core/styles/ui-kit.css";
import booths from "modules/booths";
import { BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { init } from "modules/Core/core-modules";
import timetracker from "modules/timetracker";
import cycles from "modules/cycles";
import roadmaps from "modules/roadmaps";
import Dialog from "modules/Core/sub-modules/Dialog";
import sabbaticals from "modules/sabbaticals";

const { store, rootRender, routes } = init([
  booths,
  timetracker,
  cycles,
  roadmaps,
  Dialog,
  sabbaticals,
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
