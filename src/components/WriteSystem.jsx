import { useEffect } from "react";
import PropTypes from 'prop-types';

function WriteSystem(props) {
    useEffect(() => {
        window.addEventListener('keydown', keyListener);

        return () => {
            window.removeEventListener('keydown', keyListener);
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
                check = cloneCountryNameTabRep.every((valeur, index) => valeur === props.countryName[index]);
            }
        }
        props.apply(cloneCountryNameTabRep, letter, check)
    };
    return (
        <div className='flex flex-wrap justify-center items-center gradient-border'>
            {
                props.countryNameTabRep.map((letter, index) => {
                    let bg = letter === " " ? "#e6e6e6" : "#1D1F20"
                    bg = index === props.currentLetter ? "#5015e1" : bg
                    return (
                        <div id={index} style={{ backgroundColor: bg }} key={index} className='writeSquare'>
                            {letter !== " " && letter !== "-" && letter}
                            {letter === "-" && "-"}
                        </div>
                    )
                })
            }
        </div>
    )
}
WriteSystem.propTypes = {
    currentLetter: PropTypes.number.isRequired,
    countryNameTab: PropTypes.array.isRequired,
    countryNameTabRep: PropTypes.array.isRequired,
    apply: PropTypes.func.isRequired,
    countryName: PropTypes.string.isRequired
};
export default WriteSystem;