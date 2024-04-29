import { useState, useEffect } from "react";
import DecorativeFlag from "../DecorativeFlag/DecorativeFlag";
function DecoraitveFlagGroup() {
  const [flagsToShow, setFlagsToShow] = useState(0);

  useEffect(() => {
    const adjustFlagsDisplay = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 600) {
        setFlagsToShow(0);
      } else if (windowWidth >= 600 && windowWidth < 900) {
        setFlagsToShow(3);
      } else {
        setFlagsToShow(4);
      }
    };
    adjustFlagsDisplay();
    window.addEventListener("resize", adjustFlagsDisplay);
    return () => {
      window.removeEventListener("resize", adjustFlagsDisplay);
    };
  }, []);

  return (
    <>
      <div className="divDecorativeFlag-left">
        {[...Array(flagsToShow)].map((_, index) => (
          <DecorativeFlag
            key={index}
            className={`DecorativeFlag ${
              index < flagsToShow ? "show-flags" : ""
            }`}
            flagNum={`d-flag-${(index % 2) + 1}`}
            flagUrl={`https://flagcdn.com/w320/fr.png`}
          />
        ))}
      </div>
      <div className="divDecorativeFlag-right">
        {[...Array(flagsToShow)].map((_, index) => (
          <DecorativeFlag
            key={index}
            className={`DecorativeFlag ${
              index < flagsToShow ? "show-flags" : ""
            }`}
            flagNum={`d-flag-${(index % 2) + 1}`}
            flagUrl={`https://flagcdn.com/w320/fr.png`}
          />
        ))}
      </div>
    </>
  );
}

export default DecoraitveFlagGroup;
