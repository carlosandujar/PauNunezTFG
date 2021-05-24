import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LangContext, langs } from "./config/lang-context";
import BoundingBoxes, {
  CleanUpBoundingBoxes,
  Cameras,
} from "./config/viewer-variables";
import "./App.css";
// import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Information from "./components/Information";
import Models from "./components/Models";
import PointCloudViewer from "./components/PointCloudViewer";

function App() {
  const [lang, changeLang] = useState(
    langs[localStorage.getItem("lang") || "ca"]
  );
  const [activeBB, setActiveBB] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const handleBBCheckbox = (e, i) => {
    let arr = [...activeBB];
    arr[i] = !arr[i];
    setActiveBB(arr);
  };

  return (
    <div className="App">
      <LangContext.Provider
        value={[
          lang,
          (l) => {
            changeLang(langs[l]);
            localStorage.setItem("lang", l);
          },
          localStorage.getItem("lang") || "ca",
        ]}
      >
        <Router basename="/">
          <Switch>
            <Route exact path="/">
              <>
                <NavBar />
                <Home />
                <Information />
                <Models
                  bb={BoundingBoxes}
                  handleBBCheckbox={handleBBCheckbox}
                  activeBB={activeBB}
                />
              </>
            </Route>
            <Route path="/PointCloudViewer">
              <PointCloudViewer
                bb={BoundingBoxes}
                activeBB={activeBB}
                cleanUpBB={CleanUpBoundingBoxes}
                cameras={Cameras}
              />
            </Route>
          </Switch>
        </Router>
      </LangContext.Provider>
    </div>
  );
}

export default App;

// TODO: Info
// TODO: Translation
// TODO: Trajectories (+ voiceover)
// TODO: Fotos
// Matriu que multiplicada per (0,0,1) o (0,0,-1)
// dona el vector orientacio de la camera
// la posicio ja ve donada al fitxer Bundler
