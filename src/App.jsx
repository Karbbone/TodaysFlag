import { useState, useEffect } from "react";

import "./scss/App.scss";
import "normalize.css";
import seedrandom from "seedrandom";
import json_country_code from "./res/country_codes.json";

import Flag from "./components/Flag/Flag.jsx";
import WriteSystem from "./components/WriteSystem/WriteSystem.jsx";
import Legend from "./components/Legend/Legend.jsx";
import axios from "axios";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [, setCountryCode] = useState("0");
  const [flagUrl, setFlagUrl] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryNameTab, setCountryNameTab] = useState([]);
  const [countryNameTabRep, setCountryNameTabRep] = useState([]);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [checkResponse, setCheckResponse] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    countryData("fra");
  }, []);

  const countryData = async (selectLangage) => {
    setCurrentLetter(0);
    const seed = new Date().toLocaleDateString();
    seedrandom(seed, { global: true }); // On initialise notre seed random ici c'est en fonction de la date
    const randomNumber = getRandomInt(0, 249); // On prend un nombre aleatoire entre 0 et 249
    setCountryCode(json_country_code[randomNumber]);
    const removeAccents = (str) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}`
      );
      let tab;
      switch (selectLangage) {
        case "fra":
          setCountryName(
            removeAccents(
              response.data[0].translations.fra.common.toUpperCase()
            )
          );
          tab = response.data[0].translations.fra.common.split("");
          setCountryNameTab(tab);
          break;
        default:
          setCountryName(
            removeAccents(response.data[0].name.common.toUpperCase())
          );
          tab = response.data[0].name.common.split("");
          setCountryNameTab(tab);
      }
      setFlagUrl(response.data[0].flags.png);
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
        <Header countryData={countryData} />
        <main id="main">
          <div id="flag-content">
            <div className="center">
              <div className="wrapper">
                <div id="main-content">
                  {flagUrl && <Flag flagUrl={flagUrl} />}
                  {checkResponse ? (
                    <>
                      <Confetti
                        run={true}
                        recycle={false}
                        width={width}
                        height={height}
                      />
                      <p>BRAVO</p>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className="clues">
                          <div className="clue"> Indice 1</div>
                          <div className="clue"> Indice 2</div>
                        </div>
                        <div className="separator"></div>
                      </div>
                      <Legend />
                      <WriteSystem
                        countryName={countryName}
                        apply={applyChangeWriteSystem}
                        currentLetter={currentLetter}
                        countryNameTab={countryNameTab}
                        countryNameTabRep={countryNameTabRep}
                      />
                      <p className="italic">
                        Ecrire la reponse, en écrivant sur votre clavier ou sur
                        téléphone en tapotant sur les cases
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
