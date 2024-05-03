import { useContext } from "react";
import logo from "../../assets/logo.png";
import Select from "react-select";
import PropTypes from "prop-types";
import { LanguageContext } from "../../context/LanguageContext";

function Header() {
  const { setLanguage } = useContext(LanguageContext);

  const options = [
    { value: "fra", image: "https://flagsapi.com/FR/flat/32.png" },
    { value: "en", image: "https://flagsapi.com/GB/flat/32.png" },
  ];

  const onChangeLangage = (selectedOption) => {
    if (selectedOption) {
      setLanguage(selectedOption.value);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      minHeight: "unset",
      height: "40px",
      width: "fit-content",
      boxShadow: state.isFocused ? "0 0 0 1px #00ad9f" : "none",
    }),
    indicatorSeparator: () => ({}),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#00ad9f",
      transition: "transform 0.3s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#00a2b1" : null, // Couleur de fond au survol
      color: state.isSelected ? "#fff" : "#000", // Couleur du texte de l'option sélectionnée
      "&:hover": {
        backgroundColor: "#00ad9f", // Couleur de fond au survol
      },
    }),
  };
  return (
    <header id="header">
      <div className="wrapper">
        <div className="cols">
          <div className="col-l">
            <img className="logoHeader" src={logo}></img>
          </div>
          <nav className="col-m">
            <ul>
              <li>Drapeau</li>
              <li className="inactive">Capitale</li>
              <li className="inactive">Course 60s</li>
            </ul>
          </nav>
          <div className="col-r">
            <Select
              isSearchable={false}
              styles={customStyles}
              options={options}
              onChange={onChangeLangage}
              defaultValue={options[0]}
              formatOptionLabel={(country) => (
                <div className="countries-select">
                  <img src={country.image} alt="country-image" />
                </div>
              )}
              placeholder="Langue"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
Header.propTypes = {
  countryData: PropTypes.func.isRequired,
};
export default Header;
