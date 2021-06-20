import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getGPUTier } from "detect-gpu";
import AOS from "aos";

import { LangContext, langs } from "./config/lang-context";
import BoundingBoxes from "./config/viewer-variables";

import "./App.css";
import "aos/dist/aos.css";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Information from "./components/Information";
import Configuration from "./components/Configuration";
import Models from "./components/Models";
import Footer from "./components/Footer";
import PointCloudViewer from "./components/PointCloudViewer";

function App() {
  // ca = catalan, es = spanish, en = english
  const [lang, changeLang] = useState(
    langs[localStorage.getItem("lang") || "ca"]
  );
  // 0 = dark, 1 = light
  const [theme, setTheme] = useState(localStorage.getItem("theme") === "true");
  const [activeBB, setActiveBB] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [viewType, setViewType] = useState(null); // 0 = FULL, 1 = PLANT, 2 = SELECTION
  const [viewConfig, setViewConfig] = useState({
    controls: 0, // 0 - FPS, 1 - Orbital
    pointBudget: localStorage.getItem("pointBudget") // [100e3 ... 10e6]
      ? parseInt(localStorage.getItem("pointBudget"))
      : 1e6,
    fov: 60, // [20 ... 100]
    pointQuality: 0, // 0 - Standard (square), 1 - High (circle)
    edl: false,
    compass: true,
    annotations: localStorage.getItem("annotations") === "true",
    photos: localStorage.getItem("photos") === "true",
  });
  const [GPU, setGPU] = useState({
    isMobile: "-",
    gpu: "-",
    tier: "-",
  });
  const [memory, setMemory] = useState("-");
  const [cpuCores, setCpuCores] = useState("-");

  // AOS (Animate on Scroll) initialization
  useEffect(() => {
    AOS.init({
      duration: 2500,
      once: true,
      mirror: false,
      anchorPlacement: "top-center",
    });
  }, []);

  // Save preferred theme to localStorage and
  // imperatively set body's background color
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = !theme ? "rgb(15, 15, 15)" : "white";
  }, [theme]);
  // Save user's Viewer Configuration
  useEffect(() => {
    localStorage.setItem("annotations", viewConfig.annotations);
  }, [viewConfig.annotations]);
  useEffect(() => {
    localStorage.setItem("photos", viewConfig.photos);
  }, [viewConfig.photos]);
  useEffect(() => {
    localStorage.setItem("pointBudget", viewConfig.pointBudget);
  }, [viewConfig.pointBudget]);

  // Get GPU and other hardware info @ mount
  useEffect(() => {
    async function getGPU() {
      const gpu = await getGPUTier();
      setGPU(gpu);
    }
    getGPU();
    setMemory(navigator.deviceMemory);
    setCpuCores(navigator.hardwareConcurrency);
  }, []);

  // Update appearance settings (point budget, splat quality, etc)
  // when GPU info is already available
  useEffect(() => {
    if (GPU.tier !== "-") {
      const values = [900e3, 4e6, 8e6];
      setViewConfig((prev) => ({
        ...prev,
        pointBudget: values[GPU.tier - 1],
        pointQuality: GPU.tier > 2 ? 1 : 0,
      }));
      const pb = localStorage.getItem("pointBudget");
      if (pb) {
        setViewConfig((prev) => ({
          ...prev,
          pointBudget: parseInt(pb),
        }));
      }
    }
  }, [GPU]);

  const clearAllActiveBB = () => {
    setActiveBB([0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const activateBB = (i) => {
    let arr = [...activeBB];
    arr[i] = !arr[i];
    setActiveBB(arr);
  };

  return (
    <div
      className="App"
      style={{
        color: !theme ? "white" : "black",
        backgroundColor: !theme
          ? "rgba(15, 15, 15, 0.3)"
          : "rgba(255, 255, 255, 0.1)",
      }}
    >
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
                <Information theme={theme} />
                <Models
                  theme={theme}
                  bb={BoundingBoxes}
                  activeBB={activeBB}
                  activateBB={activateBB}
                  clearAllActiveBB={clearAllActiveBB}
                  setViewType={(vt) => setViewType(vt)}
                />
                <Configuration
                  memory={memory}
                  cpuCores={cpuCores}
                  GPU={GPU}
                  theme={theme}
                  viewConfig={viewConfig}
                  setViewConfig={(item, value) => {
                    setViewConfig((prev) => ({
                      ...prev,
                      [item]: value,
                    }));
                  }}
                />
                <Footer theme={theme} />
              </>
            </Route>
            <Route path="/PointCloudViewer">
              <PointCloudViewer
                activeBB={activeBB}
                viewType={viewType}
                viewConfig={viewConfig}
              />
            </Route>
          </Switch>
        </Router>
      </LangContext.Provider>
    </div>
  );
}

export default App;

// TODO: Trajectories (+ voiceover)
// TODO: Fotos
// Matriu que multiplicada per (0,0,1) o (0,0,-1)
// dona el vector orientacio de la camera
// la posicio ja ve donada al fitxer Bundler
