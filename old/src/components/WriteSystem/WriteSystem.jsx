import { useEffect } from "react";
import PropTypes from "prop-types";

function WriteSystem(props) {
  const keyboardLetter = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["", "", "W", "X", "C", "V", "B", "N", "DEL", ""],
  ];

  useEffect(() => {
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], props.currentLetter]);

  const keyListener = (event) => {
    handleOnChangeInputText(event.key);
  };

  const handleOnChangeInputText = (key) => {
    let check = false;
    let letter = props.currentLetter;
    let cloneCountryNameTab = Object.assign([], props.countryNameTab);
    let cloneCountryNameTabRep = Object.assign([], props.countryNameTabRep);
    if (key === "Backspace" || key === "DEL") {
      if (letter >= 1) {
        if (
          cloneCountryNameTab[letter - 1] === " " ||
          cloneCountryNameTab[letter - 1] === "-"
        ) {
          cloneCountryNameTabRep[letter - 2] = ".";
          letter = letter - 2;
        } else {
          cloneCountryNameTabRep[letter - 1] = ".";
          letter = letter - 1;
        }
      } else {
        cloneCountryNameTabRep[letter] = ".";
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      cloneCountryNameTabRep[letter] = key.toUpperCase();
      if (
        cloneCountryNameTab[letter + 1] === " " ||
        cloneCountryNameTab[letter + 1] === "-"
      ) {
        letter = letter + 2;
      } else if (letter < cloneCountryNameTab.length) {
        letter = letter + 1;
      }
      if (letter >= cloneCountryNameTab.length - 1) {
        check = cloneCountryNameTabRep.every(
          (valeur, index) => valeur === props.countryName[index]
        );
      }
    }
    props.apply(cloneCountryNameTabRep, letter, check);
  };

  return (
    <div id="content-write">
      <div className="writeDiv">
        {props.countryNameTabRep.map((letter, index) => {
          let bg = letter === " " ? "#ffffff" : "hsl(81, 72.7%, 37%)";
          bg = index === props.currentLetter ? "hsl(82, 88.9%, 72.1%)" : bg;
          return (
            <div
              id={index}
              style={{ backgroundColor: bg }}
              key={index}
              className="writeSquare"
            >
              {letter !== " " && letter !== "-" && letter}
              {letter === "-" && "-"}
            </div>
          );
        })}
      </div>
      <div className="keyboard">
        {keyboardLetter.map((line, index) => (
          <div key={index} className="keyboard-line">
            {line.map((letter) => (
              <a
                onClick={() => handleOnChangeInputText(letter)}
                key={letter}
                className={`keyboard-key ${
                  letter === "" ? "keyboard-invisible" : ""
                }`}
              >
                {letter}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
WriteSystem.propTypes = {
  currentLetter: PropTypes.number.isRequired,
  countryNameTab: PropTypes.array.isRequired,
  countryNameTabRep: PropTypes.array.isRequired,
  apply: PropTypes.func.isRequired,
  countryName: PropTypes.string.isRequired,
};
export default WriteSystem;
