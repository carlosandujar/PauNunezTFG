import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LangContext, langs } from "./lang-context";
import "./App.css";
import Home from "./components/Home";
import PointcloudNavigator from "./components/PointcloudNavigator";

function App() {
  const [lang, changeLang] = useState(
    langs[localStorage.getItem("lang") || "ca"]
  );
  const [pointCloudID, setPointCloudID] = useState("0");

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
              <Home callback={(id) => setPointCloudID(id)} />
            </Route>
            <Route path="/PointcloudNavigator">
              <PointcloudNavigator id={pointCloudID} />
            </Route>
          </Switch>
        </Router>
      </LangContext.Provider>
    </div>
  );
}

export default App;
