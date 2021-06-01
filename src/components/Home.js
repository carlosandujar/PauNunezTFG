import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
// import { LangContext } from "../config/lang-context";
import "./Home.css";

import carousel1 from "../assets/img/carousel/1.jpg";
import carousel2 from "../assets/img/carousel/2.jpg";
import carousel3 from "../assets/img/carousel/3.jpg";
import carousel4 from "../assets/img/carousel/4.jpg";
import carousel5 from "../assets/img/carousel/5.jpg";
import carousel6 from "../assets/img/carousel/6.jpg";
import carousel7 from "../assets/img/carousel/7.jpg";
import carousel8 from "../assets/img/carousel/8.jpg";
import carousel9 from "../assets/img/carousel/9.jpg";
import carousel10 from "../assets/img/carousel/10.jpg";

import ellipse_top from "../assets/img/carousel/ellipse_top.png";
import ellipse_top_white from "../assets/img/carousel/ellipse_top_white.png";
// import ellipse_bot from "../assets/img/carousel/ellipse_bot.png";

const Home = (props) => {
  return (
    <section className="home-wrapper" id="home" data-aos="zoom-out">
      <img
        src={ellipse_top}
        id="ellipse-top"
        alt="ellipse-top"
        style={{ opacity: !props.theme ? 1 : 0 }}
      />
      <img
        src={ellipse_top_white}
        id="ellipse-top-white"
        alt="ellipse-top"
        style={{ opacity: !props.theme ? 0 : 1 }}
      />

      <h1
        id="title-home"
        style={{
          color: !props.theme ? "white" : "black",
          textShadow: !props.theme ? "0px 0px 8px red" : "0px 0px 3px red",
        }}
      >
        Sant Quirze de Pedret
      </h1>
      <Carousel
        fade
        controls={false}
        indicators={false}
        interval={5000}
        pause={false}
        className={"carousel-wrapper"}
      >
        <Carousel.Item>
          <img className="d-block w-100" src={carousel1} alt="carousel1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel6} alt="carousel6" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel3} alt="carousel3" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel7} alt="carousel7" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel2} alt="carousel2" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel8} alt="carousel8" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel4} alt="carousel4" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel9} alt="carousel9" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel5} alt="carousel5" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel10} alt="carousel10" />
        </Carousel.Item>
      </Carousel>
      <img
        src={ellipse_top}
        id="ellipse-bot"
        alt="ellipse-bot"
        style={{ opacity: !props.theme ? 1 : 0 }}
      />
      <img
        src={ellipse_top_white}
        id="ellipse-bot-white"
        alt="ellipse-bot"
        style={{ opacity: !props.theme ? 0 : 1 }}
      />
    </section>
  );
};

export default Home;
