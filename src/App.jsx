import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/App.scss";
import "normalize.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import GameFlagDiv from "./components/GameFlagDiv/GameFlagDiv.jsx";
import { Homepage } from "./pages/Homepage.jsx";
function App() {
  return (
    <Router>
      <div id="content">
        <Header />
        <main id="main">
          <Routes>
            <Route path="/flag" element={<GameFlagDiv />}></Route>
            <Route path="/" element={<Homepage />}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
