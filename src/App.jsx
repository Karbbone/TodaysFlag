import { useState } from "react";
import "./scss/App.scss";
import "normalize.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DecorativeFlagGroup from "./components/DecorativeFlagGroup/DecorativeFlagGroup.jsx";
import GameFlagDiv from "./components/GameFlagDiv/GameFlagDiv.jsx";
import { LanguageContext } from "./context/LanguageContext";

function App() {
  const [language, setLanguage] = useState("fra");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div id="content">
        <Header />
        <main id="main">
          <DecorativeFlagGroup />
          <GameFlagDiv />
        </main>
      </div>
      <Footer />
    </LanguageContext.Provider>
  );
}

export default App;
