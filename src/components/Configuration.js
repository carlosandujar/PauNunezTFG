import React, { useState, useEffect } from "react";
import { LangContext } from "../config/lang-context";
import { Form } from "react-bootstrap";
import "./Configuration.css";

import wasd_dark from "../assets/img/configuration/wasd_dark.png";
import wasd_light from "../assets/img/configuration/wasd_light.png";
import mouse_dark from "../assets/img/configuration/mouse_dark.png";
import mouse_light from "../assets/img/configuration/mouse_light.png";

// String with commas separating each thousand
const numWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Configuration = (props) => {
  const navItemDescriptionStyle = {
    marginTop: "3rem",
    color: !props.theme ? "white" : "black",
    backgroundColor: !props.theme
      ? "rgba(15, 15, 15, 0.75)"
      : "rgba(255, 255, 255, 0.75)",
    boxShadow: !props.theme
      ? "0px 0px 2rem 2rem rgba(15, 15, 15, 0.75)"
      : "0px 0px 2rem 2rem rgba(255, 255, 255, 0.75)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const navItemImgStyle = {
    backgroundColor: !props.theme
      ? "rgba(15, 15, 15, 0.75)"
      : "rgba(255, 255, 255, 0.75)",
    boxShadow: !props.theme
      ? "0px 0px 2rem 2rem rgba(15, 15, 15, 0.75)"
      : "0px 0px 2rem 2rem rgba(255, 255, 255, 0.75)",
  };
  const appearanceItemStyle = {
    backgroundColor: !props.theme
      ? "rgba(15, 15, 15, 0.75)"
      : "rgba(255, 255, 255, 0.75)",
    boxShadow: !props.theme
      ? "0px 0px 2rem 2rem rgba(15, 15, 15, 0.75)"
      : "0px 0px 2rem 2rem rgba(255, 255, 255, 0.75)",
    width: "35%",
    margin: "3rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <LangContext.Consumer>
      {([lang, changeLang, l]) => (
        <section
          className="configuration-wrapper"
          id="configuration"
          style={{
            backgroundColor: !props.theme
              ? "rgba(15, 15, 15, 0.75)"
              : "rgba(255, 255, 255, 0.75)",
            color: !props.theme ? "white" : "black",
          }}
        >
          {/* ================================================================= */}
          <h1 data-aos="zoom-in">{lang.configuration.title}</h1>
          <h3 data-aos="zoom-in">{lang.configuration.sections[0].title}</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <div
              className="navigation-item"
              style={{ marginRight: "2.5rem" }}
              onClick={() => props.setViewConfig("controls", 0)}
              data-aos="fade-right"
            >
              <img
                src={!props.theme ? wasd_dark : wasd_light}
                style={navItemImgStyle}
                alt="fps navigation"
              ></img>
              <div style={navItemDescriptionStyle}>
                <h5
                  style={{
                    boxShadow: !props.viewConfig.controls
                      ? "0px 0px 5px 5px rgba(255, 0, 0, 0.35)"
                      : "none",
                    backgroundColor: !props.viewConfig.controls
                      ? "rgba(255, 0, 0, 0.35)"
                      : "transparent",
                  }}
                >
                  {lang.configuration.sections[0].firstPerson.title}
                </h5>
                {lang.configuration.sections[0].firstPerson.text.map(
                  (par, i) => (
                    <p key={i}>{par}</p>
                  )
                )}
              </div>
            </div>
            <div
              className="navigation-item"
              style={{ marginLeft: "2.5rem" }}
              onClick={() => props.setViewConfig("controls", 1)}
              data-aos="fade-left"
            >
              <img
                src={!props.theme ? mouse_dark : mouse_light}
                style={navItemImgStyle}
                alt="orbital navigation"
              ></img>
              <div style={navItemDescriptionStyle}>
                <h5
                  style={{
                    boxShadow: props.viewConfig.controls
                      ? "0px 0px 5px 5px rgba(255, 0, 0, 0.35)"
                      : "none",
                    backgroundColor: props.viewConfig.controls
                      ? "rgba(255, 0, 0, 0.35)"
                      : "transparent",
                  }}
                >
                  {lang.configuration.sections[0].orbital.title}
                </h5>
                {lang.configuration.sections[0].orbital.text.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "4.5rem 0 6rem",
            }}
          >
            <div
              style={{
                fontSize: "1.25rem",
                backgroundColor: !props.theme
                  ? "rgba(15, 15, 15, 0.75)"
                  : "rgba(255, 255, 255, 0.75)",
                boxShadow: !props.theme
                  ? "0px 0px 2rem 2rem rgba(15, 15, 15, 0.75)"
                  : "0px 0px 2rem 2rem rgba(255, 255, 255, 0.75)",
              }}
              data-aos="fade-up"
            >
              <i className="fas fa-compass" style={{ fontSize: "2.5rem" }}></i>
              <p>
                <b>{lang.configuration.sections[0].compass.title}</b>
              </p>
              <div>
                <span
                  onClick={() =>
                    props.setViewConfig("compass", !props.viewConfig.compass)
                  }
                  style={{
                    padding: "0 0.75rem",
                    boxShadow: props.viewConfig.compass
                      ? "0px 0px 5px 5px rgba(255, 0, 0, 0.35)"
                      : "none",
                    backgroundColor: props.viewConfig.compass
                      ? "rgba(255, 0, 0, 0.35)"
                      : "transparent",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`fas ${
                      props.viewConfig.compass ? "fa-check" : "fa-times"
                    }`}
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {
                    lang.configuration.sections[0].compass.values[
                      props.viewConfig.compass ? 1 : 0
                    ]
                  }
                </span>
                <div style={{ margin: "1rem 0", maxWidth: "30vw" }}>
                  {lang.configuration.sections[0].compass.description}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          <h3 data-aos="zoom-in">{lang.configuration.sections[1].title}</h3>
          <div
            style={{
              fontSize: "1.25rem",
              display: "inline-block",
              margin: "0 0 3rem",
              backgroundColor: !props.theme
                ? "rgba(15, 15, 15, 0.75)"
                : "rgba(255, 255, 255, 0.75)",
              boxShadow: !props.theme
                ? "0px 0px 2rem 2rem rgba(15, 15, 15, 0.75)"
                : "0px 0px 2rem 2rem rgba(255, 255, 255, 0.75)",
            }}
            data-aos="zoom-in"
          >
            <i
              className={`fas ${
                props.GPU.isMobile ? "fa-mobile-alt" : "fa-desktop"
              }`}
              style={{ fontSize: "2.5rem" }}
            ></i>
            <p>
              <b>{lang.configuration.sections[1].specs.title}</b>
            </p>
            <span>{`${lang.configuration.sections[1].specs.plataforma}: ${
              lang.configuration.sections[1].specs.plataformaValue[
                props.GPU.isMobile ? 0 : 1
              ]
            }`}</span>
            <br></br>
            <span>{`${lang.configuration.sections[1].specs.gpu}: ${
              props.GPU.gpu ? props.GPU.gpu.toUpperCase() : "-"
            }`}</span>
            <br></br>
            <span>{`${lang.configuration.sections[1].specs.categoria}: ${
              lang.configuration.sections[1].specs.categoriaValue[
                props.GPU.tier - 1
              ]
            }`}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // margin: "3rem 0 0rem",
              padding: "0 0 3rem",
              justifyContent: "center",
              // alignItems: "flex-start",
              // alignContent: "flex-end",
              fontSize: "1.25rem",
            }}
          >
            <div style={appearanceItemStyle} data-aos="fade-down-right">
              <i className="fas fa-cloud" style={{ fontSize: "2.5rem" }} />
              <Form.Label htmlFor="pointBudget-input">
                <b>{lang.configuration.sections[1].pointBudget.title}</b>
              </Form.Label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>100K</span>
                <Form.Control
                  type="range"
                  id="pointBudget-input"
                  name="pointBudget-input"
                  custom
                  style={{
                    margin: "0 1rem 0.5rem",
                    cursor: "pointer",
                    minWidth: "15vw",
                  }}
                  max={10e6}
                  min={100e3}
                  step={100}
                  // defaultValue={props.viewConfig.pointBudget}
                  value={props.viewConfig.pointBudget}
                  onChange={(e) =>
                    props.setViewConfig("pointBudget", parseInt(e.target.value))
                  }
                />
                <span>10M</span>
              </div>
              <span>
                <b>{numWithCommas(props.viewConfig.pointBudget)}</b>
              </span>
              <div style={{ margin: "1rem 0" }}>
                {lang.configuration.sections[1].pointBudget.description.map(
                  (par, i) => (
                    <p id={i}>{par}</p>
                  )
                )}
              </div>
            </div>
            <div style={appearanceItemStyle} data-aos="fade-down-left">
              <i className="fas fa-video" style={{ fontSize: "2.5rem" }} />
              <Form.Label htmlFor="fov-input">
                <b>{lang.configuration.sections[1].fov.title}</b>
              </Form.Label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>20º</span>
                <Form.Control
                  type="range"
                  id="fov-input"
                  name="fov-input"
                  custom
                  style={{
                    margin: "0 1rem 0.5rem",
                    cursor: "pointer",
                    minWidth: "15vw",
                  }}
                  max={100}
                  min={20}
                  // defaultValue={props.viewConfig.pointBudget}
                  value={props.viewConfig.fov}
                  onChange={(e) =>
                    props.setViewConfig("fov", parseInt(e.target.value))
                  }
                />
                <span>100º</span>
              </div>
              <span>
                <b>{props.viewConfig.fov}</b>
              </span>
              <div style={{ margin: "1rem 0" }}>
                {lang.configuration.sections[1].fov.description.map(
                  (par, i) => (
                    <p id={i}>{par}</p>
                  )
                )}
              </div>
            </div>
            <div style={appearanceItemStyle} data-aos="fade-up-right">
              <i className="fas fa-shapes" style={{ fontSize: "2.5rem" }} />
              <p>
                <b>{lang.configuration.sections[1].pointQuality.title}</b>
              </p>
              <div>
                <span
                  onClick={() => props.setViewConfig("pointQuality", 0)}
                  style={{
                    padding: "0 0.75rem",
                    boxShadow: !props.viewConfig.pointQuality
                      ? "0px 0px 5px 5px rgba(255, 0, 0, 0.35)"
                      : "none",
                    backgroundColor: !props.viewConfig.pointQuality
                      ? "rgba(255, 0, 0, 0.35)"
                      : "transparent",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fas fa-square"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {lang.configuration.sections[1].pointQuality.values[0]}
                </span>
                <span
                  onClick={() => props.setViewConfig("pointQuality", 1)}
                  style={{
                    padding: "0 0.75rem",
                    boxShadow: props.viewConfig.pointQuality
                      ? "0px 0px 5px 5px rgba(255, 0, 0, 0.35)"
                      : "none",
                    backgroundColor: props.viewConfig.pointQuality
                      ? "rgba(255, 0, 0, 0.35)"
                      : "transparent",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fas fa-circle"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {lang.configuration.sections[1].pointQuality.values[1]}
                </span>
              </div>
              <div style={{ margin: "1rem 0" }}>
                {lang.configuration.sections[1].pointQuality.description.map(
                  (par, i) => (
                    <p id={i}>{par}</p>
                  )
                )}
              </div>
            </div>
            <div style={appearanceItemStyle} data-aos="fade-up-left">
              <i className="fas fa-lightbulb" style={{ fontSize: "2.5rem" }} />
              <p>
                <b>{lang.configuration.sections[1].edl.title}</b>
              </p>
              <div>
                <span
                  onClick={() =>
                    props.setViewConfig("edl", !props.viewConfig.edl)
                  }
                  style={{
                    padding: "0 0.75rem",
                    boxShadow: props.viewConfig.edl
                      ? "0px 0px 5px 5px rgba(255, 0, 0, 0.35)"
                      : "none",
                    backgroundColor: props.viewConfig.edl
                      ? "rgba(255, 0, 0, 0.35)"
                      : "transparent",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`fas ${
                      props.viewConfig.edl ? "fa-check" : "fa-times"
                    }`}
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {
                    lang.configuration.sections[1].edl.values[
                      props.viewConfig.edl ? 1 : 0
                    ]
                  }
                </span>
                <div style={{ margin: "1rem 0" }}>
                  {lang.configuration.sections[1].edl.description.map(
                    (par, i) => (
                      <p id={i}>{par}</p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </LangContext.Consumer>
  );
};

export default Configuration;
