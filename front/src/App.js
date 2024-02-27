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

  useEffect(() => {
    const countryData = async () => {
      const seed = new Date().toLocaleDateString();
      seedrandom(seed, { global: true }); // On initialise notre seed random ici c'est en fonction de la date
      const randomNumber = getRandomInt(0, 249);  // On prend un nombre aleatoire entre 0 et 250
      setCountryCode(json_country_code[randomNumber]);

      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}`);
        console.log(response.data[0])
        setFlagUrl(response.data[0].flags.png);
        setCountryName(response.data[0].name.common)
        let tab = response.data[0].name.common.split("")
        setCountryNameTab(tab);
      } catch (error) {
        console.error('Error fetching flag:', error);
      }
    };

    countryData();
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className='flex flex-col items-center text-white'>
      {countryCode}
      <br></br>
      {countryName}
      {flagUrl && <Flag flagUrl={flagUrl} />}
      <div className='flex flex-wrap justify-center items-center px-12'>
        {
          countryNameTab.map((letter, index) => {
            let bg = letter === " " ? "#e6e6e6" : "#1D1F20"
            return (
              <div key={index} style={{background:bg}} className='w-10 h-10 mt-1 gradient-border flex justify-center items-center text-white'>
                {letter.toUpperCase()}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
