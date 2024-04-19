import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function WriteSystem(props) {
  const inputRef = useRef(null);
  const [inputMobile, setInputMobile] = useState([]);

  useEffect(() => {
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], props.currentLetter]);

  const keyListener = (event) => {
    let check = false;
    let letter = props.currentLetter;
    let cloneCountryNameTab = Object.assign([], props.countryNameTab);
    let cloneCountryNameTabRep = Object.assign([], props.countryNameTabRep);
    if (event.key === "Backspace") {
      if (letter >= 1 && cloneCountryNameTabRep[letter] === ".") {
        if (cloneCountryNameTab[letter - 1] === " ") {
          cloneCountryNameTabRep[letter - 2] = ".";
          letter = letter - 2;
        } else {
          cloneCountryNameTabRep[letter - 1] = ".";
          letter = letter - 1;
        }
      } else {
        cloneCountryNameTabRep[letter] = ".";
      }
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      cloneCountryNameTabRep[letter] = event.key.toUpperCase();
      if (cloneCountryNameTab[letter + 1] === " ") {
        letter = letter + 2;
      } else if (letter < cloneCountryNameTab.length - 1) {
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

  const handleDivClick = () => {
    inputRef.current.focus();
  };

  const handleOnChangeInputText = (key) => {
    let cloneCountryNameTab = Object.assign([], props.countryNameTab);
    let cloneCountryNameTabRep = Object.assign([], props.countryNameTabRep);
    let check = false;
    let letter = props.currentLetter;
    if (key === "Backspace") {
      if (letter >= 1 && cloneCountryNameTabRep[letter] === ".") {
        if (cloneCountryNameTab[letter - 1] === " ") {
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
      if (cloneCountryNameTab[letter + 1] === " ") {
        letter = letter + 2;
      } else if (letter < cloneCountryNameTab.length - 1) {
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

  const handleChangeInputMobile = (e) => {
    let cloneInputMobile = Object.assign([], inputMobile);
    let key;
    if (e.target.value.length > cloneInputMobile.length) {
      key = e.target.value.slice(-1);
    } else {
      key = "Backspace";
    }
    handleOnChangeInputText(key);
    setInputMobile(e.target.value);
  };
  return (
    <div id="content-write">
      <div className="writeDiv" onClick={handleDivClick}>
        {props.countryNameTabRep.map((letter, index) => {
          let bg = letter === " " ? "#ffffff" : "#153a51";
          bg = index === props.currentLetter ? "#2e8ce9" : bg;
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
        <input
          type="text"
          ref={inputRef}
          style={{ display: "block", zIndex: -1, position: "absolute" }}
          onChange={(e) => handleChangeInputMobile(e)}
        />
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
