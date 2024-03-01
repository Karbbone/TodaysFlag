import React, { useEffect } from "react";
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
        let letter = props.currentLetter;
        let cloneCountryNameTab = Object.assign([], props.countryNameTab);
        let cloneCountryNameTabRep = Object.assign([], props.countryNameTabRep);
        let element = document.getElementById(letter);
        if (event.key === "Backspace") {
            if (letter >= 1 && cloneCountryNameTabRep[letter] === ".") {
                if (cloneCountryNameTab[letter - 1] === " ") {
                    element = document.getElementById(letter - 2);
                    element.style.animation = 'zoomOutAndIn 1s';
                    element.addEventListener('animationend', () => {
                        element.style.animation = 'none';
                    });
                    cloneCountryNameTabRep[letter - 2] = ".";
                    letter = letter - 2;
                } else {
                    let element = document.getElementById(letter - 1);
                    element.style.animation = 'zoomOutAndIn 1s';
                    element.addEventListener('animationend', () => {
                        element.style.animation = 'none';
                    });
                    cloneCountryNameTabRep[letter - 1] = ".";
                    letter = letter - 1;
                }
            } else {
                element.style.animation = 'zoomOutAndIn 1s';
                element.addEventListener('animationend', () => {
                    element.style.animation = 'none';
                });
                cloneCountryNameTabRep[letter] = ".";
            }
        } else if (/^[a-zA-Z]$/.test(event.key)) {
            element = document.getElementById(letter);
            element.style.animation = 'zoomIn 0.5s';
            element.addEventListener('animationend', () => {
                element.style.animation = 'none';
            });
            cloneCountryNameTabRep[letter] = event.key.toUpperCase();
            if (cloneCountryNameTab[letter + 1] === " ") {
                letter = letter + 2;
            } else if (letter < cloneCountryNameTab.length - 1) {
                letter = letter + 1;
            }
        }
        props.apply(cloneCountryNameTabRep, letter)
    };
    return (
        <div className='flex flex-wrap justify-center items-center gradient-border'>
            {
                props.countryNameTabRep.map((letter, index) => {
                    let bg = letter === " " ? "#e6e6e6" : "#1D1F20"
                    bg = index === props.currentLetter ? "#5015e1" : bg
                    return (
                        <div id={index} key={1} style={{ background: bg }} className='writeSquare'>
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
    countryNameTab: PropTypes.object.isRequired,
    countryNameTabRep: PropTypes.object.isRequired,
    apply: PropTypes.func.isRequired
};
export default WriteSystem;