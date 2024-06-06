import logo from "../assets/freepik/20944707.png";
import backgroundFlagGame from "../assets/freepik/red-blue-polygonal-background/O4YIH10.jpg";
import Paris from "../assets/paris.jpg";
import Sprint from "../assets/freepik/flat-design-cross-country-illustration/7461474.jpg";
export const Homepage = () => {
  return (
    <>
      <section id="section-home">
        <div className="wrapper">
          <div className="cols">
            <div className="col-l">
              <h2>
                Today&apos;s <span className="span-gradient">Flag</span>
              </h2>
              <p>
                Votre besoin quotidien de{" "}
                <span className="span-gradient">culture générale</span>.{" "}
                <br></br> Apprenez les drapeaux du monde entier en vous amusant.
              </p>
            </div>
            <div className="col-r">
              <img src={logo}></img>
            </div>
          </div>
        </div>
      </section>
      <div className="separator"></div>
      <section id="section-mode">
        <div className="wrapper">
          <h2>
            Modes de <span className="span-gradient">jeux</span>
          </h2>
          <div className="games-list">
            <div className="game-container">
              <a
                href="/flag"
                aria-label="Redirection vers la page de jeu des drapeaux"
                className="game"
              >
                <div
                  style={{ backgroundImage: `url(${backgroundFlagGame})` }}
                ></div>
                <p>Drapeau</p>
              </a>
              <p>Découvre le drapeau du jour avec des indices</p>
            </div>
            <div className="game-container">
              <a className="game">
                <div style={{ backgroundImage: `url(${Paris})` }}></div>
                <p>Capitale</p>
              </a>
              <p>Découvre la capitale du jour grâce à des photos</p>
            </div>
            <div className="game-container">
              <a className="game">
                <div style={{ backgroundImage: `url(${Sprint})` }}></div>
                <p>Course</p>
              </a>
              <p>Nommer le maximum de drapeau en 60s !</p>
            </div>
          </div>
        </div>
      </section>
      <div className="separator"></div>
    </>
  );
};
