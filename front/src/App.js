import React, { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import json_country_code from './res/country_codes.json';
import Flag from './components/Flag.js';
import WriteSystem from './components/WriteSystem.js';

import axios from 'axios';
import './App.css';

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
    const randomNumber = getRandomInt(0, 249);  // On prend un nombre aleatoire entre 0 et 249
    setCountryCode(json_country_code[randomNumber]);

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}`);
      setFlagUrl(response.data[0].flags.png);
      setCountryName(response.data[0].name.common.toUpperCase())
      let tab = response.data[0].name.common.split("")
      setCountryNameTab(tab);
      for (let i = 0; i < tab.length; i++) {
        if (tab[i] === ' ' || tab[i] === '"' || tab[i] === '-' || tab[i] === "'") {
          tab[i] = " ";
        } else {
          tab[i] = ".";
        }
      }
      setCountryNameTabRep(tab);
    } catch (error) {
      console.error('Error fetching flag:', error);
    }
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const applyChangeWriteSystem = (countryNameTabRep,letter,check) => {
    setCountryNameTabRep(countryNameTabRep);
    setCurrentLetter(letter);
    setCheckResponse(check);
 };

  return (
    <div className='flex flex-col items-center text-white'>
      {countryCode}
      {currentLetter}
      {countryName}
      {!checkResponse ? <p>Pas bon</p> : <p>BON</p>}
      {flagUrl && <Flag flagUrl={flagUrl} />}
      &nbsp;
      {checkResponse ? <p>BRAVO</p> : <WriteSystem countryName={countryName} apply={applyChangeWriteSystem} currentLetter={currentLetter} countryNameTab={countryNameTab} countryNameTabRep={countryNameTabRep}/> }
    </div>
  );
}

export default App;
