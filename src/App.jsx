import { useState, useEffect } from "react";
import seedrandom from "seedrandom";
import json_country_code from "./res/country_codes.json";
import Flag from "./components/Flag.jsx";
import WriteSystem from "./components/WriteSystem.jsx";

import axios from "axios";
import "./scss/App.scss";
import "normalize.css";

function App() {
  const [countryCode, setCountryCode] = useState("0");
  const [flagUrl, setFlagUrl] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryNameTab, setCountryNameTab] = useState([]);
  const [countryNameTabRep, setCountryNameTabRep] = useState([]);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [checkResponse, setCheckResponse] = useState(false);

  useEffect(() => {
    countryData();
  }, []);

  const countryData = async () => {
    const seed = new Date().toLocaleDateString();
    seedrandom(seed, { global: true }); // On initialise notre seed random ici c'est en fonction de la date
    const randomNumber = getRandomInt(0, 249); // On prend un nombre aleatoire entre 0 et 249
    setCountryCode(json_country_code[randomNumber]);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}`
      );
      setFlagUrl(response.data[0].flags.png);
      setCountryName(response.data[0].name.common.toUpperCase());
      let tab = response.data[0].name.common.split("");
      setCountryNameTab(tab);
      for (let i = 0; i < tab.length; i++) {
        if (
          tab[i] === " " ||
          tab[i] === '"' ||
          tab[i] === "-" ||
          tab[i] === "'"
        ) {
          tab[i] = " ";
        } else {
          tab[i] = ".";
        }
      }
      setCountryNameTabRep(tab);
    } catch (error) {
      console.error("Error fetching flag:", error);
    }
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const applyChangeWriteSystem = (countryNameTabRep, letter, check) => {
    setCountryNameTabRep(countryNameTabRep);
    setCurrentLetter(letter);
    setCheckResponse(check);
  };

  return (
    <>
      <div id="content">
        <header id="header"></header>
        <main id="main">
          <div id="flag-content">
            <div className="wrapper">
              <div className="center">
                {flagUrl && <Flag flagUrl={flagUrl} />}
                {checkResponse ? (
                  <p>BRAVO {countryCode}</p>
                ) : (
                  <WriteSystem
                    countryName={countryName}
                    apply={applyChangeWriteSystem}
                    currentLetter={currentLetter}
                    countryNameTab={countryNameTab}
                    countryNameTabRep={countryNameTabRep}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer id="footer"></footer>
    </>
  );
}

export default App;
