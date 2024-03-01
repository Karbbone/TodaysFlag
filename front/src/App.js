import React, { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import json_country_code from './res/country_codes.json';
import Flag from './components/Flag.js';
import axios from 'axios';
import './App.css';

function App() {
  const [countryCode, setCountryCode] = useState("0");
  const [flagUrl, setFlagUrl] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryNameTab, setCountryNameTab] = useState([]);
  const [countryNameTabRep, setCountryNameTabRep] = useState([]);
  const [currentLetter, setCurrentLetter] = useState(0);

  useEffect(() => {
    countryData();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', keyListener);

    return () => {
      window.removeEventListener('keydown', keyListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], currentLetter]);

  const keyListener = (event) => {
    let letter = currentLetter;
    let cloneCountryNameTab = Object.assign([], countryNameTab);
    let cloneCountryNameTabRep = Object.assign([], countryNameTabRep);
    let element = document.getElementById(letter);
    if (event.key === "Backspace") {
      if (letter >= 1 && cloneCountryNameTabRep[letter] === ".") {
        if (cloneCountryNameTab[letter - 1] === " ") {
          element = document.getElementById(letter - 2);
          element.style.animation = 'zoomOutAndIn 1s';
          element.addEventListener('animationend', () => {
            element.style.animation = 'none';
          });
          cloneCountryNameTabRep[letter - 2] = ".";
          letter = letter - 2;
        } else {
          let element = document.getElementById(letter- 1);
          element.style.animation = 'zoomOutAndIn 1s';
          element.addEventListener('animationend', () => {
            element.style.animation = 'none';
          });
          cloneCountryNameTabRep[letter - 1] = ".";
          letter = letter - 1;
        }
      } else {
        element.style.animation = 'zoomOutAndIn 1s';
        element.addEventListener('animationend', () => {
          element.style.animation = 'none';
        });
        cloneCountryNameTabRep[letter] = ".";
      }
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      element = document.getElementById(letter);
      element.style.animation = 'zoomIn 0.5s';
      element.addEventListener('animationend', () => {
        element.style.animation = 'none';
      });
      cloneCountryNameTabRep[letter] = event.key.toUpperCase();
      if (cloneCountryNameTab[letter + 1] === " ") {
        letter = letter + 2;
      } else if (letter < cloneCountryNameTab.length - 1) {
        letter = letter + 1;
      }
    }
    setCurrentLetter(letter);
    setCountryNameTab(cloneCountryNameTab);
    setCountryNameTabRep(cloneCountryNameTabRep);
  };

  const countryData = async () => {
    const seed = new Date().toLocaleDateString();
    seedrandom(seed, { global: true }); // On initialise notre seed random ici c'est en fonction de la date
    const randomNumber = getRandomInt(0, 249);  // On prend un nombre aleatoire entre 0 et 249
    setCountryCode(json_country_code[randomNumber]);

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}`);
      setFlagUrl(response.data[0].flags.png);
      setCountryName(response.data[0].name.common)
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

  return (
    <div className='flex flex-col items-center text-white'>
      {countryCode}
      {currentLetter}
      <br></br>
      {countryName}
      {flagUrl && <Flag flagUrl={flagUrl} />}
      &nbsp;
      <div className='flex flex-wrap justify-center items-center gradient-border'>
        {
          countryNameTabRep.map((letter, index) => {
            let bg = letter === " " ? "#e6e6e6" : "#1D1F20"
            bg = index === currentLetter ? "#5015e1" : bg
            return (
              <div id={index} key={index} style={{ background: bg }} className='writeSquare'>
                {letter !== " " && letter !== "-" && letter}
                {letter === "-" && "-"}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
