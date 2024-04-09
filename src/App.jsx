import { useState, useEffect } from "react";
import seedrandom from "seedrandom";
import json_country_code from "./res/country_codes.json";
import Flag from "./components/Flag.jsx";
import WriteSystem from "./components/WriteSystem.jsx";

import logo from "./assets/logo.png";
import axios from "axios";
import "./scss/App.scss";
import "normalize.css";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [, setCountryCode] = useState("0");
  const [flagUrl, setFlagUrl] = useState("");
  const [countryName, setCountryName] = useState("");
  const [, setLangage] = useState("");
  const [countryNameTab, setCountryNameTab] = useState([]);
  const [countryNameTabRep, setCountryNameTabRep] = useState([]);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [checkResponse, setCheckResponse] = useState(false);
  const { width, height } = useWindowSize();
  useEffect(() => {
    countryData();
  }, []);

  const countryData = async (selectLangage) => {
    const seed = new Date().toLocaleDateString();
    seedrandom(seed, { global: true }); // On initialise notre seed random ici c'est en fonction de la date
    const randomNumber = getRandomInt(0, 249); // On prend un nombre aleatoire entre 0 et 249
    setCountryCode(json_country_code[randomNumber]);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}`
      );
      let tab;
      switch (selectLangage) {
        case "fra":
          setCountryName(
            response.data[0].translations.fra.common.toUpperCase()
          );
          tab = response.data[0].translations.fra.common.split("");
          setCountryNameTab(tab);
          console.log(response.data[0].translations.fra.common.toUpperCase());
          break;
        default:
          setCountryName(response.data[0].name.common.toUpperCase());
          tab = response.data[0].name.common.split("");
          setCountryNameTab(tab);
          console.log(response.data[0].name.common.toUpperCase());
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

  const onChangeLangage = async (e) => {
    setLangage(e.target.value);
    setCurrentLetter(0);
    await countryData(e.target.value);
  };

  return (
    <>
      <div id="content">
        <header id="header">
          <div className="wrapper">
            <div className="cols">
              <div className="col-l">
                <img src={logo} />
              </div>
              <nav className="col-m">
                <ul></ul>
              </nav>
              <div className="col-r">
                <select
                  onChange={(e) => onChangeLangage(e)}
                  style={{ fontSize: "20px" }}
                  name="countries"
                >
                  <option value="eng">🇬🇧</option>
                  <option value="fra">🇫🇷</option>
                </select>
              </div>
            </div>
          </div>
        </header>
        <main id="main">
          <div id="flag-content">
            <div className="wrapper">
              <div className="center">
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
