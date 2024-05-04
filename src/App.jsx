import { useState } from "react";
import "./scss/App.scss";
import "normalize.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DecoraitveFlagGroup from "./components/DecorativeFlagGroup/DecorativeFlagGroup.jsx";
import GameFlagDiv from "./components/GameFlagDiv/GameFlagDiv.jsx";
import { LanguageContext } from "./context/LanguageContext";

function App() {
  const [language, setLanguage] = useState("fra");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <DecoraitveFlagGroup />
      <div id="content">
        <Header />
        <main id="main">
          <GameFlagDiv />
        </main>
      </div>
      <Footer />
    </LanguageContext.Provider>
  );
}

export default App;
