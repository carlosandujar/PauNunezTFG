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
              <div style={{ flex: "7", textAlign: "justify" }}>
                <p>
                  Els orígens de Sant Quirze de Pedret són molt poc documentats.
                  El lloc de Pedret és esmentat l'any 983 entre les possessions
                  del monestir de Sant Llorenç prop Bagà, però de l'església, no
                  se'n té referència fins al 1167, tot i que és evidentment
                  anterior.
                </p>
                <p>
                  Sant Quirze de Pedret presenta autèntics problemes pel que fa
                  a la seva datació. Actualment hom s'inclina a pensar que
                  l'església correspon únicament a dues etapes constructives:
                  l'obra preromànica del segle x (fruit d'una sola campanya i
                  d'un únic projecte, contra allà que s'ha dit a vegades), i les
                  modificacions romàniques de finals de segle xii. En els anys
                  1960-62 l'església fou restaurada per la Diputació de
                  Barcelona, sota la direcció de l'arquitecte Camil Pallàs.
                  Aquesta restauració introduí alguns elements de confusió en la
                  lectura arquitectònica de l'edifici que dificulten encara més
                  la comprensió de la seva complexa cronologia.
                </p>
                <p>
                  El 20 d'octubre del 983 es consagrava l'església de Sant
                  Miquel de Sant Llorenç prop Bagà; el levita Francó donà a
                  aquesta església un alou amb les seves cases, horts, vinyes i
                  totes les seves possessions i una església, el nom de la qual
                  és esborrat en el document, situada al comtat de Berga, a la
                  muntanya de Pedret i al lloc de Nesplosa (...cum ipsa ecclesia
                  sancti... qui est in comitatu Bergitano, in monte Petreto in
                  locum vocitatum Nesplosa.). No podem assegurar que aquesta fos
                  l'església de Sant Quirze de Pedret, car el document ha perdut
                  aquest fragment, però si ho fos, Sant Quirze no tindria
                  aleshores caràcter parroquial.
                </p>
              </div>
              <div style={{ flex: "3", textAlign: "left" }}>
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
                  <i class="fas fa-map-marker-alt"></i> - Mapa
                </button>
              </a>
              <a
                style={{ margin: "0 1rem" }}
                href={turismeBergaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <i class="fas fa-globe"></i> - Web
                </button>
              </a>
              <a
                href={l === "es" ? wikiLink_es : wikiLink_ca}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <i class="fab fa-wikipedia-w"></i> - Viquipèdia
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

// http://www.turismeberga.cat/que-fer/turisme-cultural/esglesies/item/361-sant-quirze-de-pedret/361-sant-quirze-de-pedret
// https://www.cercs.cat/directori/turisme/esglesia-sant-quirze-de-pedret
// https://www.catalunyamedieval.es/esglesia-de-sant-quirze-de-pedret-cercs-bergueda/
// https://www.elturistatranquil.com/iglesia-de-sant-quirze-de-pedret/
// https://ca.wikipedia.org/wiki/Sant_Quirze_de_Pedret
