import { useState, useEffect } from "react";
import seedrandom from "seedrandom";
import json_country_code from "./res/country_codes.json";
import Flag from "./components/Flag.jsx";
import WriteSystem from "./components/WriteSystem.jsx";
import logo from "./assets/logo.png";
import githubLogo from "./assets/github-original.svg";
import axios from "axios";
import Select from "react-select";
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
    countryData("fra");
  }, []);

  const countryData = async (selectLangage) => {
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

  const options = [
    { value: "fra", image: "https://flagsapi.com/FR/flat/32.png" },
    { value: "en", image: "https://flagsapi.com/GB/flat/32.png" },
  ];

  const onChangeLangage = async (selectedOption) => {
    if (selectedOption) {
      setLangage(selectedOption.value);
      setCurrentLetter(0);
      await countryData(selectedOption.value);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      minHeight: "unset",
      height: "40px",
      width: "fit-content",
      boxShadow: state.isFocused ? "0 0 0 1px #00ad9f" : "none",
    }),
    indicatorSeparator: () => ({}),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#00ad9f",
      transition: "transform 0.3s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#00a2b1" : null, // Couleur de fond au survol
      color: state.isSelected ? "#fff" : "#000", // Couleur du texte de l'option sélectionnée
      "&:hover": {
        backgroundColor: "#00ad9f", // Couleur de fond au survol
        // Ajoutez d'autres styles de survol si nécessaire
      },
    }),
  };

  return (
    <>
      <div id="content">
        <header id="header">
          <div className="wrapper">
            <div className="cols">
              <div className="col-l">
                <img className="logoHeader" src={logo}></img>
              </div>
              <nav className="col-m">
                <ul>
                  <li>Drapeau</li>
                  <li className="inactive">Capitale</li>
                  <li className="inactive">Course 60s</li>
                </ul>
              </nav>
              <div className="col-r">
                <Select
                  isSearchable={false}
                  styles={customStyles}
                  options={options}
                  onChange={onChangeLangage}
                  defaultValue={options[0]}
                  formatOptionLabel={(country) => (
                    <div className="countries-select">
                      <img src={country.image} alt="country-image" />
                    </div>
                  )}
                  placeholder="Langue"
                />
              </div>
            </div>
          </div>
        </header>
        <main id="main">
          <div id="flag-content">
            <div className="center">
              <div className="wrapper">
                <h1>TODAY&apos;S FLAG</h1>
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
          <div></div>
        </main>
      </div>
      <footer id="footer">
        <div className="flex flex-center">
          <p>Made by Karbbone(Clément)</p>
          <a href="https://github.com/Karbbone">
            <img src={githubLogo} className="logo-github-footer" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
