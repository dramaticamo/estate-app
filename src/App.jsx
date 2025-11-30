import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { FavouritesContext } from "./context/FavouritesContext";

import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import FavouritesPage from "./pages/FavouritesPage";

function App() {
  const { favourites } = useContext(FavouritesContext);

  return (
    <Router>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-4 shadow-sm">
      <a className="navbar-brand fw-bold" href="/">
        🏠 Estate App
      </a>

      {/* Hamburger Button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Menu */}
      <div className="collapse navbar-collapse" id="navbarMenu">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <a className="nav-link" href="/">Search</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/favourites">
              ❤️ Favourites
            </a>
          </li>

        </ul>
      </div>
    </nav>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>

    </Router>
  );
}

export default App;
