import React, { useState, useEffect } from "react";
import { LangContext } from "../config/lang-context";
import "./Footer.css";

import logo from "../assets/img/logos/logo.png";
import ryo from "../assets/img/footer/ryo.jpg";
import upc from "../assets/img/logos/upc.png";
import fib from "../assets/img/logos/fib.png";
import virvig from "../assets/img/logos/virvig.png";

const Footer = (props) => {
  return (
    <LangContext.Consumer>
      {([lang, changeLang, l]) => (
        <section className="footer-wrapper" id="footer">
          <div
            className="gradient-separator-2"
            style={{
              background: `linear-gradient(180deg, 
                rgba(${
                  !props.theme ? "15, 15, 15" : "255, 255, 255"
                }, 0.75) 0%, 
                rgba(${
                  !props.theme ? "15, 15, 15" : "255, 255, 255"
                }, 1) 100%)`,
            }}
          ></div>
          <div className="footer-contents">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="logo-app" id="logo-web"></img>
              <h3>{lang.footer.title}</h3>
              <a
                href={`https://github.com/Artagok/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "14pt" }}>{lang.footer.author}</span>
                  <img src={ryo} id="donations-profile" alt="ryosuke"></img>
                </div>
              </a>
            </div>
            <div className="organization-logos">
              <a
                href={`https://www.upc.edu/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={upc} alt="upc-logo"></img>
              </a>
              <a
                href={`https://www.fib.upc.edu/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fib} alt="fib-logo"></img>
              </a>
              <a
                href={`https://www.virvig.eu/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={virvig} alt="virvig-logo"></img>
              </a>
            </div>
          </div>
        </section>
      )}
    </LangContext.Consumer>
  );
};

export default Footer;
