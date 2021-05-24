import React from "react";

export const langs = {
  ca: {
    navbar: {
      items: ["Inici", "Informació", "Models 3D", "Configuració"],
    },
    info: {
      title: "Informació",
      text: `Sant Quirze de Pedret és una obra preromànica del municipi de Cercs (Berguedà), declarada Bé Cultural d'Interès Nacional (BCIN) i de gran importància dins el patrimoni arquitectònic català.
      Tot i ser al municipi de Cercs, el seu accés es fa des de Berga, a través del pont gòtic de Pedret, que creua el riu Llobregat.`,
      sections: [
        {
          title: "Història",
          par: [
            `Els orígens de l'església són molt poc documentats. Pedret és esmentat per primera vegada l'any 983 entre les propietats del monestir de Sant Llorenç (Bagà), però de l'edifici no se'n té referència fins a l'any 1167. Se sap, però, que l'edifici és anterior a aquesta data. Tot i els problemes per establir la seva datació, la teoria més acceptada és que el monument correspon a dues etapes constructives: l'obra preromànica del segle X i les modificacions romàniques a finals del segle XII. Es té constància que Sant Quirze de Pedret tenia caràcter parroquial a finals de l'època medieval, ja que l'any 1312 apareix esmentada amb aquesta categoria en vista al deganat de Berga. Cap al segle XVIII l'església era sufragània (amb territori i drets quasi parroquials, però que depenia d'una parròquia eclesiàstica principal) de Santa Maria de la Baells. `,
            `Després d'anys de profanació i abandonament, l'església fou restaurada pel Servei de Catalogació i Conservació de Monuments de la Diputació de Barcelona i retornada al culte el setembre de 1964. L'any 1989 s'inicia la segona i definitiva restauració, emfatitzant els aspectes d'interpretació, protecció i difusió. Avui dia l'església només té culte el dia de la festa anual i depèn de l'església parroquial de Berga. La seva conservació depèn de l'ajuntament de Berga, en virtut d'un acord subscrit entre el bisbat de Solsona i l'ajuntament, que vinculava Pedret al museu comarcal de Berga.`,
          ],
        },
        {
          title: "Arquitectura",
          par: [
            `L'església original és d'estil preromànic, d'una sola nau (la nau central actual) amb absis trapezoidal, del segle IX. Hi tenia una porta, avui inexistent, que donava a l'oest. El segle següent es va realitzar l'ampliació a les tres naus actuals, afegint dues naus laterals a cada cantó de la nau principal. Aquestes naus secundàries estan acabades amb absidioles amb planta d'arc de ferradura. L'absis i les absidioles són al costat de llevant i les seves embocadures tenen arcs ultrapassats, recolzats sobre capitells i columnes. Les naus són a diferents alçades, ja que l'església es troba en desnivell perquè està situada a una llera de pedres (possiblement d'aquí el nom de "Pedret") inclinada, sent la nau nord la més elevada.`,
            `De la nau sud només se'n conserva una petita avantsala contigua a l'absidiola. La resta va ser substituït al segle XIII per un campanar de torre que va caure (possiblement amb els terratrèmols del segle XV) i per un porxo que dóna cobertura a la portada romànica original. Aquesta portada és la porta principal i únic accés actualment al monument. Està formada per arquivoltes llises recolzades en línies d'imposta, flanquejades per capitells decorats i sostinguts per un fust estrigilat (oest) i un de salomònic (est), ambdós assentats en bases.`,
            `Al segle XVIII es va afegir una espardenya a la cara de ponent, però va haver de ser enderrocada durant l'última restauració a causa del seu mal estat. Durant el canvi d'etapa d'estil preromànic a romànic, es va substituir la teulada de fusta a dues aigües per la tradicional volta de canó de pedra. Aquest canvi va obligar a reforçar els murs de la nau central per tal de suportar la nova teulada, que era molt més pesada.`,
          ],
        },
      ],
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
