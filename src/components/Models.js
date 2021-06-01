import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { LangContext } from "../config/lang-context";
import { ViewType } from "../config/viewer-variables";
import "./Models.css";

import planta_light from "../assets/img/mapa/planta_pedret_light.png";
import planta_dark from "../assets/img/mapa/planta_pedret_dark.png";

const Models = (props) => {
  const anyActiveBB = props.activeBB.some((b) => b);

  const modelsButtonStyle = {
    color: !props.theme ? "white" : "black",
    border: !props.theme ? "1px solid white" : "1px solid black",
    backgroundColor: !props.theme
      ? "rgba(15, 15, 15, 0.75)"
      : "rgba(255, 255, 255, 0.75)",
  };

  return (
    <LangContext.Consumer>
      {([lang, changeLang, l]) => (
        <section
          className="models-wrapper"
          id="3d-models"
          style={{
            backgroundColor: !props.theme
              ? "rgba(15, 15, 15, 0.75)"
              : "rgba(255, 255, 255, 0.75)",
            color: !props.theme ? "white" : "black",
          }}
        >
          <h1 data-aos="fade-down">{lang.models.title}</h1>
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
              data-aos="fade-right"
            >
              <Link
                to="/PointCloudViewer"
                onClick={() => props.setViewType(ViewType.FULL)}
              >
                <div className="models-button" style={modelsButtonStyle}>
                  <i className="fas fa-church"></i>
                  {lang.models.buttons[0]}
                </div>
              </Link>
              <Link
                to="/PointCloudViewer"
                onClick={() => props.setViewType(ViewType.PLANT)}
              >
                <div className="models-button" style={modelsButtonStyle}>
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
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: !anyActiveBB ? 50 : 120e3, hide: 0 }}
                  overlay={
                    <Tooltip id="button-tooltip" className="button-tooltip">
                      {lang.models.tooltip}
                    </Tooltip>
                  }
                >
                  <div
                    className="models-button"
                    style={{
                      opacity: anyActiveBB ? 1 : 0.35,
                      cursor: anyActiveBB ? "pointer" : "not-allowed",
                      ...modelsButtonStyle,
                    }}
                  >
                    <i className="fas fa-list-ol"></i>
                    {lang.models.buttons[2]}
                  </div>
                </OverlayTrigger>
              </Link>
            </div>
            <div
              id="models-plant-map"
              style={{
                backgroundColor: !props.theme
                  ? "rgba(15, 15, 15, 0.75)"
                  : "rgba(255, 255, 255, 0.75)",
                boxShadow: !props.theme
                  ? "0px 0px 2rem 2rem rgba(15, 15, 15, 0.75)"
                  : "0px 0px 2rem 2rem rgba(255, 255, 255, 0.75)",
              }}
              data-aos="zoom-out"
            >
              <img
                src={props.theme ? planta_light : planta_dark}
                alt="models-plant-map"
              ></img>
            </div>
            <div className="models-checkboxes" data-aos="fade-left">
              {/* First BB is plant view so we skip it */}
              <i
                className="fas fa-times-circle"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "-3.75rem",
                  transform: "translateX(-50%)",
                  fontSize: "3rem",
                  color: "red",
                  border: `1px solid ${!props.theme ? "white" : "black"}`,
                  borderRadius: "50%",
                  backgroundColor: !props.theme ? "white" : "black",
                  cursor: anyActiveBB ? "pointer" : "initial",
                  opacity: anyActiveBB ? 1 : 0.35,
                }}
                onClick={() => (anyActiveBB ? props.clearAllActiveBB() : {})}
              ></i>
              {props.bb.map((bb, i) =>
                bb.id !== 0 ? (
                  <span
                    className="models-room-list"
                    id={i}
                    onClick={() => props.activateBB(i)}
                    style={{
                      textShadow: props.activeBB[bb.id]
                        ? `0px 0px ${!props.theme ? "12px" : "0"} red`
                        : "none",
                      boxShadow: props.activeBB[bb.id]
                        ? "0px 0px 6px 4px rgba(255, 0, 0, 0.6)"
                        : "none",
                      color: !props.theme ? "white" : "black",
                      border: !props.theme
                        ? "1px solid white"
                        : "1px solid black",
                      backgroundColor: !props.theme
                        ? "rgba(15, 15, 15, 0.75)"
                        : "rgba(255, 255, 255, 0.75)",
                      // transition: "0.1s 0s all ease",
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
