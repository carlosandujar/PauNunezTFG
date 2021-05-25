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
import Footer from "./components/Footer";
import PointCloudViewer from "./components/PointCloudViewer";

function App() {
  const [lang, changeLang] = useState(
    langs[localStorage.getItem("lang") || "ca"]
  );
  const [theme, setTheme] = useState(false); // 0 = dark, 1 = light
  const [activeBB, setActiveBB] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const handleBBCheckbox = (e, i) => {
    let arr = [...activeBB];
    arr[i] = !arr[i];
    setActiveBB(arr);
  };

  useEffect(() => {
    const navbar = document.getElementsByClassName("navbar-wrapper")[0];
    const navbar_link = document.getElementsByClassName("navbar-link");

    const title_home = document.getElementById("title-home");

    const info_wrapper = document.getElementById("information");
    const info_wrapper_h4 = document.getElementsByClassName(
      "info-text-wrapper-2-h4"
    );
    const info_nav_button = document.getElementsByClassName("info-nav-button");

    const gradient_separator =
      document.getElementsByClassName("gradient-separator");

    const models_wrapper = document.getElementById("3d-models");

    const footer_contents =
      document.getElementsByClassName("footer-contents")[0];
    const profile = document.getElementById("donations-profile");

    // Go bright
    if (theme) {
      // === NavBar ===
      navbar.style.backgroundColor = "white";
      for (let item of navbar_link) {
        item.style.color = "black";
      }
      // === Home ===
      const title_home = document.getElementById("title-home");
      title_home.style.color = "black";
      title_home.style.textShadow = "0px 0px 3px red";
      // === Information ===
      info_wrapper.style.color = "black";
      info_wrapper.style.backgroundColor = "white";
      for (let h4 of info_wrapper_h4) {
        h4.style.borderBottom = "1px dashed rgba(0, 0, 0, 0.8)";
      }
      for (let button of info_nav_button) {
        button.style.color = "black";
        button.style.border = "1px solid black";
      }
      for (let separator of gradient_separator) {
        separator.style.background = `linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.75) 0%,
          rgba(255, 255, 255, 1) 100%`;
      }
      // === Models ===
      models_wrapper.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
      // === Configuration ===
      // === Footer ===
      footer_contents.style.backgroundColor = "white";
      footer_contents.style.color = "black";
      footer_contents.style.textShadow = "none";
      profile.style.boxShadow = "none";
    }
    // Go dark
    else {
      // === NavBar ===
      navbar.style.backgroundColor = "rgb(15, 15, 15)";
      for (let item of navbar_link) {
        item.style.color = "white";
      }
      // === Home ===
      title_home.style.color = "white";
      title_home.style.textShadow = "0px 0px 8px red";
      // === Information ===
      info_wrapper.style.color = "white";
      info_wrapper.style.backgroundColor = "rgb(15, 15, 15)";
      for (let h4 of info_wrapper_h4) {
        h4.style.borderBottom = "1px dashed rgba(255, 255, 255, 0.65)";
      }
      for (let button of info_nav_button) {
        button.style.color = "white";
        button.style.border = "1px solid white";
      }
      for (let separator of gradient_separator) {
        separator.style.background = `linear-gradient(
          0deg,
          rgba(15, 15, 15, 0.75) 0%,
          rgba(15, 15, 15, 1) 100%`;
      }
      // === Models ===
      models_wrapper.style.backgroundColor = "rgba(15, 15, 15, 0.75)";
      // === Configuration ===
      // === Footer ===
      footer_contents.style.backgroundColor = "rgb(15, 15, 15)";
      footer_contents.style.color = "white";
      footer_contents.style.textShadow = "0px 0px 4px red";
      profile.style.boxShadow = "0px 0px 7px 0px rgba(255, 0, 0, 0.5)";
    }
  }, [theme]);

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
                <NavBar
                  theme={theme}
                  changeTheme={() => setTheme((prevTheme) => !prevTheme)}
                />
                <Home theme={theme} />
                <Information />
                <Models
                  bb={BoundingBoxes}
                  handleBBCheckbox={handleBBCheckbox}
                  activeBB={activeBB}
                />
                <Footer />
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
