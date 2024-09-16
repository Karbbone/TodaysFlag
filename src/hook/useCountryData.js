import { useQuery } from "react-query";
import seedrandom from "seedrandom";
import json_country_code from "../res/country_codes.json";
import axios from "axios";

const useCountryData = () => {
  const fetchCountryData = async () => {
    const response = await axios.get(
      "https://worldtimeapi.org/api/timezone/Europe/Paris"
    );
    const dateTime = response.data.datetime;
    const datePart = dateTime.slice(0, 10);
    const dateObject = new Date(datePart);
    const formattedDate = dateObject.toLocaleDateString("fr-FR");
    seedrandom(formattedDate, { global: true });

    const randomNumber = Math.floor(Math.random() * 250);
    const countryCode = json_country_code[randomNumber];

    const clearName = (str) => {
      return str
        .replace(/ *\([^)]*\) */g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };

    const countryResponse = await axios.get(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const countryData = countryResponse.data[0];
    const countryName = clearName(
      countryData.translations.fra.common.toUpperCase()
    );
    const flagUrl = countryData.flags.png;
    const countryNameTab = countryName.split("");
    const countryNameTabRep = countryName
      .split("")
      .map((char) => (char.match(/[ "\-']/) ? " " : "."));

    return {
      flagUrl,
      countryName,
      countryNameTab,
      countryNameTabRep,
      countryCode,
    };
  };

  return useQuery("countryData", fetchCountryData, {
    refetchOnWindowFocus: false,
  });
};

export default useCountryData;
