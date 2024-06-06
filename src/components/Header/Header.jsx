import logo from "../../assets/logo.png";
import { useState } from "react";
function Header() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
          <div className="col-r" onClick={() => toggleTheme()}>
            <span>{theme === "light" ? "🌙" : "🌞"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
