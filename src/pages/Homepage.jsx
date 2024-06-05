import logo from "../assets/freepik/20944707.jpg";
import backgroundFlagGame from "../assets/freepik/red-blue-polygonal-background/O4YIH10.jpg";
export const Homepage = () => {
  return (
    <>
      <section id="section-home">
        <div className="wrapper">
          <div className="cols">
            <div className="col-l">
              <h2>Today&apos;s flag</h2>
              <p>
                Votre besoin quotidien de culture générale. <br></br> Apprenez
                les drapeaux du monde entier en vous amusant.
              </p>
            </div>
            <div className="col-r">
              <img src={logo}></img>
            </div>
          </div>
        </div>
      </section>
      <section id="section-mode">
        <div className="wrapper">
          <h2>Mode de jeu</h2>
          <div className="games-list">
            <a
              href="/flag"
              aria-label="Redirection vers la page de jeu des drapeaux"
              className="game"
            >
              <div
                style={{ backgroundImage: `url(${backgroundFlagGame})` }}
              ></div>
              <span>Drapeau</span>
            </a>
            <a className="game">Capitale</a>
            <a className="game">Course</a>
          </div>
        </div>
      </section>
    </>
  );
};
