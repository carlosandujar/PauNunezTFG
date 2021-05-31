import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LangContext } from "../config/lang-context";
import { ViewType } from "../config/viewer-variables";
import "./Models.css";

import planta_light from "../assets/img/mapa/planta_pedret_light.png";
import planta_dark from "../assets/img/mapa/planta_pedret_dark.png";

const Models = (props) => {
  const anyActiveBB = props.activeBB.some((b) => b);

  return (
    <LangContext.Consumer>
      {([lang, changeLang, l]) => (
        <section className="models-wrapper" id="3d-models">
          <h1>{lang.models.title}</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Link
                to="/PointCloudViewer"
                onClick={() => props.setViewType(ViewType.FULL)}
              >
                <div className="models-button">
                  <i className="fas fa-church"></i>
                  {lang.models.buttons[0]}
                </div>
              </Link>
              <Link
                to="/PointCloudViewer"
                onClick={() => props.setViewType(ViewType.PLANT)}
              >
                <div className="models-button">
                  <i className="fas fa-arrows-alt"></i>
                  {lang.models.buttons[1]}
                </div>
              </Link>
              <Link
                to={anyActiveBB ? "/PointCloudViewer" : ""}
                onClick={() =>
                  anyActiveBB ? props.setViewType(ViewType.SELECTION) : {}
                }
              >
                <div
                  className="models-button"
                  style={{
                    opacity: anyActiveBB ? 1 : 0.35,
                    cursor: anyActiveBB ? "pointer" : "not-allowed",
                  }}
                >
                  <i className="fas fa-list-ol"></i>
                  {lang.models.buttons[2]}
                </div>
              </Link>
            </div>
            <div id="models-plant-map">
              <img
                src={props.theme ? planta_light : planta_dark}
                alt="models-plant-map"
              ></img>
            </div>
            <div className="models-checkboxes">
              {/* First BB is plant view so we skip it */}
              {props.bb.map((bb, i) =>
                bb.id !== 0 ? (
                  <span
                    className="models-room-list"
                    id={i}
                    onClick={() => props.activateBB(i)}
                    style={{
                      textShadow: props.activeBB[bb.id]
                        ? "0px 0px 12px red"
                        : "none",
                      boxShadow: props.activeBB[bb.id]
                        ? "0px 0px 6px 3px rgba(255, 0, 0, 0.5)"
                        : "none",
                    }}
                  >{`${lang.models.checkboxes[bb.id - 1]}`}</span>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}
    </LangContext.Consumer>
  );
};

export default Models;
