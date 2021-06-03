import React, { useState, useEffect } from "react";
import { LangContext } from "../config/lang-context";
import "./Information.css";
import BackgroundSlider from "react-background-slider";
import Accordion from "react-bootstrap/Accordion";

import home_bg1 from "../assets/img/background/1.jpg";
import home_bg2 from "../assets/img/background/2.jpg";
import home_bg3 from "../assets/img/background/3.jpg";
import home_bg4 from "../assets/img/background/4.jpg";
import home_bg5 from "../assets/img/background/5.jpg";
import home_bg6 from "../assets/img/background/6.jpg";
import home_bg7 from "../assets/img/background/7.jpg";
import home_bg8 from "../assets/img/background/8.jpg";
import home_bg9 from "../assets/img/background/9.jpg";
import home_bg10 from "../assets/img/background/10.jpg";

// Fisher-Yates (aka Knuth) Shuffle
const shuffleArray = (array) => {
  var currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

// Background image slider is randomly shuffled
const HOME_BG = shuffleArray([
  home_bg1,
  home_bg2,
  home_bg3,
  home_bg4,
  home_bg5,
  home_bg6,
  home_bg7,
  home_bg8,
  home_bg9,
  home_bg10,
]);
console.log(HOME_BG);

const gmapsLink =
  "https://www.google.com/maps/place/Esgl%C3%A9sia+de+Sant+Quirze+de+Pedret/@42.1105096,1.8126689,12z/data=!4m5!3m4!1s0x12a5091b8879abd5:0xa366ebababe0f30!8m2!3d42.1074712!4d1.883649";
const turismeBergaLink =
  "http://www.turismeberga.cat/que-fer/turisme-cultural/esglesies/item/361-sant-quirze-de-pedret/361-sant-quirze-de-pedret";
const wikiLink_ca = "https://ca.wikipedia.org/wiki/Sant_Quirze_de_Pedret";
const wikiLink_es =
  "https://es.wikipedia.org/wiki/Iglesia_de_San_Quirico_de_Pedret";

const Information = (props) => {
  const [dropdowns, setDropdowns] = useState([false, false]);

  const toggleDropdown = (i) => {
    let arr = [...dropdowns];
    arr[i] = !arr[i];
    setDropdowns(arr);
  };

  const infoNavButtonStyle = {
    color: !props.theme ? "white" : "black",
    border: !props.theme ? "1px solid white" : "1px solid black",
  };

  return (
    <LangContext.Consumer>
      {([lang, _, l]) => (
        <>
          <section
            className="info-wrapper"
            id="information"
            style={{
              color: !props.theme ? "white" : "black",
              backgroundColor: !props.theme ? "rgb(15, 15, 15)" : "white",
            }}
          >
            <h1 data-aos="zoom-in">{lang.info.title}</h1>
            <div className="info-text-wrapper">
              <div
                style={{ flex: "15", textAlign: "justify" }}
                data-aos="fade-right"
              >
                <p>{lang.info.text}</p>
                {/* === Historia === */}
                <h3>{lang.info.sections[0].title}</h3>
                {lang.info.sections[0].par.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
              <div style={{ flex: "5", textAlign: "left" }}>
                {/* Llista resum */}
                <ul>
                  {lang.info.list.map((item, i) => (
                    <li
                      key={i}
                      data-aos="fade-left"
                      data-aos-delay={`${i * 100}`}
                    >
                      <b>{item[0]}</b>
                      {item[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="info-text-wrapper-2" data-aos="fade-right">
              {/* === Arquitectura === */}
              <Accordion className="information-accordion">
                <Accordion.Toggle
                  eventKey="0"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: !props.theme ? "white" : "black",
                  }}
                  onClick={() => toggleDropdown(0)}
                >
                  <h3 style={{ display: "inline-block" }}>
                    {lang.info.sections[1].title}
                  </h3>
                  <i
                    className={`fas fa-angle-${dropdowns[0] ? "up" : "down"}`}
                    style={{ marginLeft: "0.5rem", fontSize: "1.75rem" }}
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <>
                    {lang.info.sections[1].par.map((par, i) => (
                      <p key={i}>{par}</p>
                    ))}
                  </>
                </Accordion.Collapse>
              </Accordion>
              {/* === Pintures al fresc === */}
              <Accordion className="information-accordion">
                <Accordion.Toggle
                  eventKey="0"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: !props.theme ? "white" : "black",
                  }}
                  onClick={() => toggleDropdown(1)}
                >
                  <h3 style={{ display: "inline-block" }}>
                    {lang.info.sections[2].title}
                  </h3>
                  <i
                    className={`fas fa-angle-${dropdowns[1] ? "up" : "down"}`}
                    style={{ marginLeft: "0.5rem", fontSize: "1.75rem" }}
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <>
                    {lang.info.sections[2].subsections.map((sub, i) => (
                      <>
                        <h4
                          key={i}
                          style={{
                            borderBottom: !props.theme
                              ? "1px dashed rgba(255, 255, 255, 0.65)"
                              : "1px dashed rgba(0, 0, 0, 0.85)",
                          }}
                        >
                          {sub.title}
                        </h4>
                        {sub.par.map((par, j) => (
                          <p key={j}>{par}</p>
                        ))}
                      </>
                    ))}
                  </>
                </Accordion.Collapse>
              </Accordion>
            </div>
            <nav className="info-nav" data-aos="fade-up">
              <div>
                <a href={gmapsLink} target="_blank" rel="noopener noreferrer">
                  <button
                    className="info-nav-button"
                    style={infoNavButtonStyle}
                  >
                    <i className="fas fa-map-marker-alt"></i> -{" "}
                    {lang.info.buttons.map}
                  </button>
                </a>
                <a
                  style={{ margin: "0 1rem" }}
                  href={turismeBergaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="info-nav-button"
                    style={infoNavButtonStyle}
                  >
                    <i className="fas fa-globe"></i> - {lang.info.buttons.web}
                  </button>
                </a>
                <a
                  href={l === "es" ? wikiLink_es : wikiLink_ca}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="info-nav-button"
                    style={infoNavButtonStyle}
                  >
                    <i className="fab fa-wikipedia-w"></i> -{" "}
                    {lang.info.buttons.wiki}
                  </button>
                </a>
              </div>
              <div>
                {`${lang.info.sources} `}
                <a
                  href="https://www.catalunyamedieval.es/esglesia-de-sant-quirze-de-pedret-cercs-bergueda/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`1, `}
                </a>
                <a
                  href="https://www.elturistatranquil.com/ca/esglesia-de-sant-quirze-de-pedret/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`2, `}
                </a>
                <a
                  href="https://ca.wikipedia.org/wiki/Sant_Quirze_de_Pedret"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3
                </a>
              </div>
            </nav>
          </section>
          <div
            className="gradient-separator"
            style={{
              background: !props.theme
                ? `linear-gradient(0deg, rgba(15, 15, 15, 0.75)    0%, rgba(15, 15, 15, 1)    100%`
                : `linear-gradient(0deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 1) 100%`,
            }}
          ></div>
          <BackgroundSlider images={HOME_BG} duration={10} transition={3} />
        </>
      )}
    </LangContext.Consumer>
  );
};

export default Information;

// ? Webs consultades ?
// * http://www.turismeberga.cat/que-fer/turisme-cultural/esglesies/item/361-sant-quirze-de-pedret/361-sant-quirze-de-pedret
// * https://www.cercs.cat/directori/turisme/esglesia-sant-quirze-de-pedret
// * https://www.catalunyamedieval.es/esglesia-de-sant-quirze-de-pedret-cercs-bergueda/
// * https://www.elturistatranquil.com/iglesia-de-sant-quirze-de-pedret/
// * https://ca.wikipedia.org/wiki/Sant_Quirze_de_Pedret
