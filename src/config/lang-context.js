import React from "react";

export const langs = {
  ca: {
    navbar: {
      items: ["Inici", "Informació", "Models 3D", "Configuració"],
    },
    home: {
      jumbotron: {
        p1: `Sant Quirze de Pedret és una obra del municipi de Cercs
        (Berguedà) declarada bé cultural d'interès nacional, tot i que
        el seu accés es fa des de Berga travessant el riu Llobregat
        mitjançant un pont medieval molt ben conservat.`,
        p2: `L'església de Sant Quirze de Pedret es troba aïllada i
        acompanyada d'una altra edificació prop del riu Llobregat que
        cal travessar pel pont gòtic de Pedret.`,
      },
    },
  },
  es: {
    navbar: {
      items: ["Inicio", "Información", "Modelos 3D", "Configuración"],
    },
    home: {
      jumbotron: {
        p1: `Sant Quirze de Pedret es una obra del municipio de Cercs (Bergadá) 
        declarada bien cultural de interés nacional, aunque su acceso se realiza
        desde Berga, travesando el río Llobregat mediante un puente medieval 
        muy bien conservado.`,
        p2: `La iglesia de Sant Quirze de Pedret se encuentra aislada y acompañada
        de otra edificación cerca del río Llobregat que es necesario travesar por
        el puente gótico de Pedret`,
      },
    },
  },
  en: {
    navbar: {
      items: ["Home", "Information", "3D Models", "Configuration"],
    },
    home: {
      jumbotron: {
        p1: `Phasellus ut turpis iaculis, lobortis eros nec, elementum lacus. Quisque lobortis id magna vitae semper. Nullam maximus nisl molestie dolor pharetra varius. Donec eu vestibulum leo. Fusce tortor augue, maximus eget aliquet id, pulvinar ut erat. Quisque vel nunc ac tellus luctus auctor at non elit. Curabitur at sem orci`,
        p2: `In venenatis porttitor felis in fringilla. Sed consectetur, risus sit amet accumsan tristique, felis est dignissim ligula, vitae commodo mi nibh non velit. Nullam diam lectus, tristique eget pellentesque at, consectetur sit amet quam. `,
      },
    },
  },
};

export const LangContext = React.createContext({
  lang: langs.ca,
  toggleLang: () => {},
});
