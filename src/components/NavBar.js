import React, { useState, useEffect } from "react";
import { LangContext } from "../config/lang-context";
import * as Scroll from "react-scroll";
import "./NavBar.css";

import ca from "../assets/img/lang/ca.png";
import es from "../assets/img/lang/es.png";
import en from "../assets/img/lang/en.png";

const NavBar = (props) => {
  return (
    <LangContext.Consumer>
      {([lang, changeLang, l]) => (
        <div className="navbar-wrapper">
          <nav>
            <Scroll.Link
              onClick={Scroll.animateScroll.scrollToTop}
              to=""
              smooth={true}
              className="navbar-link"
            >
              {lang.navbar.items[0]}
            </Scroll.Link>
            <Scroll.Link to="information" smooth={true} className="navbar-link">
              {lang.navbar.items[1]}
            </Scroll.Link>
            <Scroll.Link
              to="3d-models"
              smooth={true}
              offset={-50}
              className="navbar-link"
            >
              {lang.navbar.items[2]}
            </Scroll.Link>
            <Scroll.Link
              to="configuration"
              smooth={true}
              className="navbar-link"
            >
              {lang.navbar.items[3]}
            </Scroll.Link>
          </nav>
          <div className="language-button-wrapper">
            <i
              className={`fas ${props.theme ? "fa-moon" : "fa-sun"}`}
              style={{
                marginRight: "1rem",
                fontSize: "16pt",
                cursor: "pointer",
                color: `${props.theme ? "black" : "white"}`,
              }}
              onClick={props.changeTheme}
            ></i>
            <button
              className="language-button"
              onClick={() => {
                changeLang("ca");
              }}
              style={{ opacity: l === "ca" ? 1 : 0.35 }}
            >
              <img src={ca} alt="ca" />
            </button>
            <button
              className="language-button"
              onClick={() => {
                changeLang("es");
              }}
              style={{ opacity: l === "es" ? 1 : 0.35 }}
            >
              <img src={es} alt="es" />
            </button>
            <button
              className="language-button"
              onClick={() => {
                changeLang("en");
              }}
              style={{ opacity: l === "en" ? 1 : 0.35 }}
            >
              <img src={en} alt="en" />
            </button>
          </div>
        </div>
      )}
    </LangContext.Consumer>
  );
};

export default NavBar;
