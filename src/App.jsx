import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
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
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-house-door-fill me-1"></i> Estate App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={() => {
                  document.getElementById("navbarMenu").classList.remove("show")
                }}
              >
                Search
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/favourites"
                onClick={() => {
                  document.getElementById("navbarMenu").classList.remove("show")
                }}
              >
                ❤️ Favourites
              </Link>
            </li>

          </ul>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>

    </Router>
  );
}

export default App;