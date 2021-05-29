import React, { useState, useEffect } from "react";
import { LangContext } from "../config/lang-context";
import "./Information.css";
import BackgroundSlider from "react-background-slider";
import home_bg1 from "../assets/img/carousel/int1.jpg";
import home_bg2 from "../assets/img/carousel/int2.jpg";
import home_bg3 from "../assets/img/carousel/ext1.jpg";
import home_bg4 from "../assets/img/carousel/ext2.jpg";
const HOME_BG = [home_bg1, home_bg2, home_bg3, home_bg4];

const gmapsLink =
  "https://www.google.com/maps/place/Esgl%C3%A9sia+de+Sant+Quirze+de+Pedret/@42.1105096,1.8126689,12z/data=!4m5!3m4!1s0x12a5091b8879abd5:0xa366ebababe0f30!8m2!3d42.1074712!4d1.883649";
const turismeBergaLink =
  "http://www.turismeberga.cat/que-fer/turisme-cultural/esglesies/item/361-sant-quirze-de-pedret/361-sant-quirze-de-pedret";
const wikiLink_ca = "https://ca.wikipedia.org/wiki/Sant_Quirze_de_Pedret";
const wikiLink_es =
  "https://es.wikipedia.org/wiki/Iglesia_de_San_Quirico_de_Pedret";

const Information = (props) => {
  return (
    <LangContext.Consumer>
      {([lang, _, l]) => (
        <>
          <section className="info-wrapper" id="information">
            <h1>{lang.info.title}</h1>
            <div className="info-text-wrapper">
              <div style={{ flex: "15", textAlign: "justify" }}>
                <p>{lang.info.text}</p>
                {/* === Historia === */}
                <h3>{lang.info.sections[0].title}</h3>
                {lang.info.sections[0].par.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
              <div style={{ flex: "5", textAlign: "left" }}>
                <ul>
                  {lang.info.list.map((item, i) => (
                    <li key={i}>
                      <b>{item[0]}</b>
                      {item[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="info-text-wrapper-2">
              {/* === Arquitectura === */}
              <h3>{lang.info.sections[1].title}</h3>
              {lang.info.sections[1].par.map((par, i) => (
                <p key={i}>{par}</p>
              ))}
              {/* === Pintures al fresc === */}
              <h3>{lang.info.sections[2].title}</h3>
              {lang.info.sections[2].subsections.map((sub, i) => (
                <>
                  <h4 key={i} className="info-text-wrapper-2-h4">
                    {sub.title}
                  </h4>
                  {sub.par.map((par, j) => (
                    <p key={j}>{par}</p>
                  ))}
                </>
              ))}
            </div>
            <nav className="info-nav">
              <div>
                <a href={gmapsLink} target="_blank" rel="noopener noreferrer">
                  <button className="info-nav-button">
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
                  <button className="info-nav-button">
                    <i className="fas fa-globe"></i> - {lang.info.buttons.web}
                  </button>
                </a>
                <a
                  href={l === "es" ? wikiLink_es : wikiLink_ca}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="info-nav-button">
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
          <div className="gradient-separator"></div>
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
