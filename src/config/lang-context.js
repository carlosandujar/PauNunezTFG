import React from "react";

export const langs = {
  ca: {
    navbar: {
      items: ["Inici", "Informació", "Models 3D", "Configuració"],
    },
    info: {
      title: "Informació",
    },
  },
  es: {
    navbar: {
      items: ["Inicio", "Información", "Modelos 3D", "Configuración"],
    },
    info: {
      title: "Información",
    },
  },
  en: {
    navbar: {
      items: ["Home", "Information", "3D Models", "Configuration"],
    },
    info: {
      title: "Information",
    },
  },
};

export const LangContext = React.createContext({
  lang: langs.ca,
  toggleLang: () => {},
});
