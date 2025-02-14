import React, { useState, useEffect } from "react";
import DecorativeFlag from "../DecorativeFlag/DecorativeFlag";
import countryCodes from "../../res/country_codes.json"; // Remplacez par le chemin vers votre fichier JSON

function DecoraitveFlagGroup() {
  const [flagsToShow, setFlagsToShow] = useState(0);

  useEffect(() => {
    const adjustFlagsDisplay = () => {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      windowHeight = windowHeight - 120 - 50;
      let nb = windowWidth < 1000 ? 2 : Math.floor(windowHeight / 160);
      setFlagsToShow(nb);
    };
    adjustFlagsDisplay();
    window.addEventListener("resize", adjustFlagsDisplay);
    return () => {
      window.removeEventListener("resize", adjustFlagsDisplay);
    };
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div className="divDecorativeFlag-left">
        {[...Array(flagsToShow)].map((_, index) => (
          <DecorativeFlag
            key={index}
            className={`DecorativeFlag`}
            flagNum={`d-flag-${(index % 2) + 1}`}
            flagUrl={`https://flagcdn.com/w320/${countryCodes[
              getRandomInt(0, 249)
            ].toLowerCase()}.png`}
          />
        ))}
      </div>
      <div className="divDecorativeFlag-right">
        {[...Array(flagsToShow)].map((_, index) => (
          <DecorativeFlag
            key={index}
            className={`DecorativeFlag`}
            flagNum={`d-flag-${(index % 2) + 1}`}
            flagUrl={`https://flagcdn.com/w320/${countryCodes[
              getRandomInt(0, 249)
            ].toLowerCase()}.png`}
          />
        ))}
      </div>
    </>
  );
}

const MemoizedDecoraitveFlagGroup = React.memo(DecoraitveFlagGroup);
export default MemoizedDecoraitveFlagGroup;
