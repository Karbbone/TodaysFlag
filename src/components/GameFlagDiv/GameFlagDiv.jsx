import { useState } from "react";
import useCountryData from "../../hook/useCountryData.js";
import Flag from "../Flag/Flag.jsx";
import Confetti from "react-confetti";
import WriteSystem from "../WriteSystem/WriteSystem.jsx";
import Legend from "../Legend/Legend.jsx";
import useWindowSize from "react-use/lib/useWindowSize";
import { ColorRing } from "react-loader-spinner";
import DecorativeFlagGroup from "../DecorativeFlagGroup/DecorativeFlagGroup.jsx";

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
    return (
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="color-ring-loading"
        wrapperStyle={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        wrapperClass="color-ring-wrapper"
        colors={[
          "hsl(81, 72.7%, 37%)",
          "hsl(81, 72.7%, 37%)",
          "hsl(81, 72.7%, 37%)",
          "hsl(82, 88.9%, 72.1%)",
          "hsl(82, 88.9%, 72.1%)",
          "hsl(82, 88.9%, 72.1%)",
        ]}
      />
    );
  }

  if (error) {
    return <p>Error</p>;
  }

  const { flagUrl, countryName, countryNameTab, countryNameTabRep } = data;

  return (
    <>
      {checkResponse && (
        <Confetti run={true} recycle={false} width={width} height={height} />
      )}
      <DecorativeFlagGroup />
      <div id="flag-content">
        <div className="center">
          <div className="wrapper">
            <div id="main-content">
              {flagUrl && <Flag flagUrl={flagUrl} />}
              {checkResponse ? (
                <p>BRAVO</p>
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
                  </div>
                  <WriteSystem
                    countryName={countryName}
                    apply={applyChangeWriteSystem}
                    currentLetter={currentLetter}
                    countryNameTab={countryNameTab}
                    countryNameTabRep={countryNameTabRep}
                  />
                  <em className="italic">
                    Ecrire la reponse, en écrivant sur le clavier !
                  </em>
                  <Legend />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameFlagDiv;
