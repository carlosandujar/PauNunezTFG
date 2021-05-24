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
                <h3>{lang.info.sections[0].title}</h3>
                {lang.info.sections[0].par.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
              <div style={{ flex: "5", textAlign: "left" }}>
                <ul>
                  <li>
                    <b>Localització</b>: Cercs (Berga, Catalunya)
                  </li>
                  <li>
                    <b>Època</b>: S. IX i X
                  </li>
                  <li>
                    <b>Estil</b>: Romànic i preromànic
                  </li>
                  <li>
                    <b>Estat</b>: Restaurada
                  </li>
                  <li>
                    <b>Protecció</b>: Bé Cultural d'Interés Nacional
                  </li>
                  <li>
                    <b>Visitable</b>: Sí, però no lliurement
                  </li>
                </ul>
              </div>
            </div>
            <nav className="info-nav">
              <a href={gmapsLink} target="_blank" rel="noopener noreferrer">
                <button>
                  <i className="fas fa-map-marker-alt"></i> - Mapa
                </button>
              </a>
              <a
                style={{ margin: "0 1rem" }}
                href={turismeBergaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <i className="fas fa-globe"></i> - Web
                </button>
              </a>
              <a
                href={l === "es" ? wikiLink_es : wikiLink_ca}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <i className="fab fa-wikipedia-w"></i> - Viquipèdia
                </button>
              </a>
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