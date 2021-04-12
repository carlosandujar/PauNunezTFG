import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import PointcloudNavigator from "./components/PointcloudNavigator";

function App() {
  const [pointCloudID, setPointCloudID] = useState("0");

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
