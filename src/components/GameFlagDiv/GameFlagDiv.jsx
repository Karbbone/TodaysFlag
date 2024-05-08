import { useState, useEffect, useContext } from "react";
import seedrandom from "seedrandom";
import json_country_code from "../../res/country_codes.json";
import axios from "axios";
import Flag from "../Flag/Flag.jsx";
import Confetti from "react-confetti";
import WriteSystem from "../WriteSystem/WriteSystem.jsx";
import Legend from "../Legend/Legend.jsx";
import useWindowSize from "react-use/lib/useWindowSize";
import { LanguageContext } from "../../context/LanguageContext";

function GameFlagDiv() {
  const { language } = useContext(LanguageContext);
  const [, setCountryCode] = useState(0);
  const [flagUrl, setFlagUrl] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryNameTab, setCountryNameTab] = useState([]);
  const [countryNameTabRep, setCountryNameTabRep] = useState([]);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [checkResponse, setCheckResponse] = useState(false);
  const { width, height } = useWindowSize();
  useEffect(() => {
    const countryData = async (selectLangage) => {
      setCurrentLetter(0);
      const response = await axios.get(
        "http://worldtimeapi.org/api/timezone/Europe/Paris"
      );
      const dateTime = response.data.datetime;
      const datePart = dateTime.slice(0, 10);
      const dateObject = new Date(datePart);
      const formattedDate = dateObject.toLocaleDateString("fr-FR");
      const seed = formattedDate;
      seedrandom(seed, { global: true }); // On initialise notre seed random ici c'est en fonction de la date
      const randomNumber = getRandomInt(0, 249); // On prend un nombre aleatoire entre 0 et 249
      setCountryCode(json_country_code[randomNumber]);
      const clearName = (str) => {
        str = str.replace(/ *\([^)]*\) */g, "");
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}`
        );
        let tab;
        let cleanName = clearName(
          response.data[0].translations.fra.common.toUpperCase()
        );
        switch (selectLangage) {
          case "fra":
            setCountryName(cleanName);
            tab = cleanName.split("");
            setCountryNameTab(tab);
            break;
          default:
            setCountryName(
              clearName(response.data[0].name.common.toUpperCase())
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
    countryData(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

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
                    <div className="clue">💡1</div>
                    <div className="clue">💡2</div>
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
  );
}

export default GameFlagDiv;
