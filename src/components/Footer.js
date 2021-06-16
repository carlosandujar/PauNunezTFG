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
          <div
            className="footer-contents"
            style={{
              backgroundColor: !props.theme ? "rgb(15, 15, 15)" : "white",
              color: !props.theme ? "white" : "black",
              textShadow: !props.theme ? "0px 0px 2px red" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
                alt="logo-app"
                id="logo-web"
                data-aos="zoom-in"
                data-aos-anchor-placement="center-bottom"
              ></img>
              <h3 data-aos="zoom-in">{lang.footer.title}</h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
                data-aos="zoom-in"
              >
                <span>{lang.footer.author}</span>
                <a
                  href={`https://github.com/Artagok/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", marginBottom: "3rem" }}
                >
                  <img
                    src={ryo}
                    id="donations-profile"
                    alt="ryosuke"
                    style={{
                      boxShadow: !props.theme
                        ? "0px 0px 7px 0px rgba(255, 0, 0, 0.5)"
                        : "none",
                    }}
                  />
                </a>
                <div style={{ marginBottom: "1.5rem" }}>
                  <span>{lang.footer.supervisors.text}</span>
                  <a
                    href={`https://www.cs.upc.edu/~virtual/home/index.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{lang.footer.supervisors.carlos}</span>
                  </a>
                  <span>{lang.footer.supervisors.conj}</span>
                  <a
                    href={`https://directori.upc.edu/directori/dadesPersona.jsp?id=1054940`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{lang.footer.supervisors.imanol}</span>
                  </a>
                  <br></br>
                  <span>{lang.footer.model[0]}</span>
                  <a
                    href={`https://scholar.google.es/citations?user=5b5lpdjyjg0C&hl=es`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{lang.footer.model[1]}</span>
                  </a>
                </div>
                {lang.footer.acknowledgements.map((text, i) => (
                  <span key={i} style={{ maxWidth: "60%" }}>
                    {text}
                  </span>
                ))}
              </div>
            </div>
            <div className="organization-logos">
              <a
                href={`https://www.upc.edu/`}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-right"
              >
                <img src={upc} alt="upc-logo"></img>
              </a>
              <a
                href={`https://www.fib.upc.edu/`}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="zoom-in"
              >
                <img src={fib} alt="fib-logo"></img>
              </a>
              <a
                href={`https://www.virvig.eu/`}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-left"
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
