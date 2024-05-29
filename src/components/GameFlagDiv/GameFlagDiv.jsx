import { useState } from "react";
import useCountryData from "../../hook/useCountryData.js";
import Flag from "../Flag/Flag.jsx";
import Confetti from "react-confetti";
import WriteSystem from "../WriteSystem/WriteSystem.jsx";
import Legend from "../Legend/Legend.jsx";
import useWindowSize from "react-use/lib/useWindowSize";

function GameFlagDiv() {
  const { data, isLoading, error } = useCountryData();
  const [currentLetter, setCurrentLetter] = useState(0);
  const [checkResponse, setCheckResponse] = useState(false);
  const { width, height } = useWindowSize();

  const applyChangeWriteSystem = (countryNameTabRep, letter, check) => {
    if (data) {
      data.countryNameTabRep = countryNameTabRep;
    }
    setCurrentLetter(letter);
    setCheckResponse(check);
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const { flagUrl, countryName, countryNameTab, countryNameTabRep } = data;

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
