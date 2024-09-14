import logo from "../assets/freepik/20944707.png";
import backgroundFlagGame from "../assets/freepik/red-blue-polygonal-background/O4YIH10.jpg";
import Paris from "../assets/paris.jpg";
import Sprint from "../assets/freepik/flat-design-cross-country-illustration/7461474.jpg"; // Import Swiper React components
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
          <h2 className="title-section-home-page">
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
      <section id="section-flag-description">
        <div className="wrapper">
          <h2 className="title-section-home-page">
            Mode <span className="span-gradient">Drapeau</span>
          </h2>
          <div className="content">
            <div className="text">
              <p>
                Bienvenue, voici le premier mode de jeu original de Today&apos;s
                flag !
              </p>
              <p>
                Voici la règle, elle est très simple : Chaque jour, un nouveau
                drapeau vous sera présenté, et votre mission est de deviner le
                pays correspondant. Les espaces dans le nom du pays seront
                indiqués dans la légende.
              </p>
              <p>
                Amusez-vous bien et testez vos connaissances en géographie tout
                en vous amusant !
              </p>
              <span className="span-gradient">ENJOY !</span>
            </div>
            <div className="swiper-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
              >
                <SwiperSlide>
                  <img src="https://flagcdn.com/w320/fr.png"></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://flagcdn.com/w320/jp.png"></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://flagcdn.com/w320/it.png"></img>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
