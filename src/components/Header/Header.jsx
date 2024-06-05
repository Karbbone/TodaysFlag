import logo from "../../assets/logo.png";
import Select from "react-select";

function Header() {
  const options = [
    { value: "fra", image: "https://flagsapi.com/FR/flat/32.png" },
  ];

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
              <li>
                <a
                  className="active"
                  href="/"
                  aria-label="Redirection vers la page d'accueil"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  className="active"
                  href="/flag"
                  aria-label="Redirection vers la page de jeu drapeau"
                >
                  Drapeau
                </a>
              </li>
              <li className="inactive">
                <a>Capitale</a>
              </li>
              <li className="inactive">
                <a>Course 60s</a>
              </li>
            </ul>
          </nav>
          <div className="col-r">
            <Select
              isSearchable={false}
              styles={customStyles}
              options={options}
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
export default Header;
