import React, { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import json_country_code from './res/country_codes.json';
import axios from 'axios';

function App() {
  const [countryCode, setCountryCode] = useState("0");
  const [flagUrl, setFlagUrl] = useState("");

  useEffect(() => {
    const countryData = async () => {
      const seed = new Date().toLocaleDateString();
      seedrandom(seed, { global: true });
      const randomNumber = getRandomInt(2, 251); 
      setCountryCode(json_country_code[randomNumber]);
      
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${json_country_code[randomNumber]}?fields=flags`);
        console.log(response.data.flags.png)
        setFlagUrl(response.data.flags.png);
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
    <div>
      {countryCode}
      {flagUrl && <img alt='Flag' style={{ height: "350px", width: "550px" }} src={flagUrl}></img>}
    </div>
  );
}

export default App;
