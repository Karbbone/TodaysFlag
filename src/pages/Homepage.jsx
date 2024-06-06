import logo from "../assets/freepik/20944707.png";
import backgroundFlagGame from "../assets/freepik/red-blue-polygonal-background/O4YIH10.jpg";
import Paris from "../assets/paris.jpg";
import Sprint from "../assets/freepik/flat-design-cross-country-illustration/7461474.jpg"; // Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus quibusdam nisi illo obcaecati sint quas odit! Hic
                dolorum ipsum voluptatem reiciendis incidunt, cupiditate ducimus
                temporibus fuga dolorem, tempora, aperiam vero.
              </p>
            </div>
            <div className="swiper-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                <SwiperSlide>
                  <img src={Paris}></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={Sprint}></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={logo}></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={Paris}></img>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
