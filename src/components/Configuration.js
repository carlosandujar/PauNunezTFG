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
    // width: "33%",
    margin: "3rem 0",
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
          <h1>{lang.configuration.title}</h1>
          <h3>{lang.configuration.sections[0].title}</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "stretch",
              marginBottom: "6rem",
            }}
          >
            <div
              className="navigation-item"
              style={{ marginRight: "2.5rem" }}
              onClick={() => props.setViewConfig("controls", 0)}
            >
              <img
                src={!props.theme ? wasd_dark : wasd_light}
                style={navItemImgStyle}
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
            >
              <img
                src={!props.theme ? mouse_dark : mouse_light}
                style={navItemImgStyle}
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
          {/* ================================================================= */}
          <h3>{lang.configuration.sections[1].title}</h3>
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
            <span>{`${
              lang.configuration.sections[1].specs.gpu
            }: ${props.GPU.gpu.toUpperCase()}`}</span>
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
              justifyContent: "space-evenly",
              alignItems: "stretch",
              fontSize: "1.25rem",
            }}
          >
            <div style={appearanceItemStyle}>
              <i className="fas fa-cloud" style={{ fontSize: "2.5rem" }} />
              <Form.Label>
                <b>{lang.configuration.sections[1].pointBudget.title}</b>
              </Form.Label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>100K</span>
                <Form.Control
                  type="range"
                  custom
                  style={{ margin: "0 1rem 0.5rem", cursor: "pointer" }}
                  max={10e6}
                  min={100e3}
                  step={100}
                  defaultValue={props.viewConfig.pointBudget}
                  value={props.viewConfig.pointBudget}
                  onChange={(e) =>
                    props.setViewConfig("pointBudget", parseInt(e.target.value))
                  }
                />
                <span>10M</span>
              </div>
              <span>{numWithCommas(props.viewConfig.pointBudget)}</span>
              <div style={{ maxWidth: "30vw", margin: "1rem 0" }}>
                {lang.configuration.sections[1].pointBudget.description.map(
                  (par, i) => (
                    <p id={i}>{par}</p>
                  )
                )}
              </div>
            </div>
            <div style={appearanceItemStyle}>Hola</div>
            <div style={appearanceItemStyle}>Hola</div>
            <div style={appearanceItemStyle}>Hola</div>
          </div>
        </section>
      )}
    </LangContext.Consumer>
  );
};

export default Configuration;
