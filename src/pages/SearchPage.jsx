import React, { useState, useEffect, useContext } from "react";
import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FavouritesContext } from "../context/FavouritesContext";

function SearchPage() {
  const { favourites, addFavourite, removeFavourite, clearFavourites } =
    useContext(FavouritesContext);

  // -------------------------
  // FILTER STATES
  // -------------------------
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [postcode, setPostcode] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // -------------------------
  // RESULTS + SORTING
  // -------------------------
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const typeOptions = [
    { value: "", label: "Any" },
    { value: "house", label: "House" },
    { value: "flat", label: "Flat" },
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  // -------------------------
  // SORT FUNCTION
  // -------------------------
  function applySorting(list) {
    let sorted = [...list];

    if (sortOption === "priceLow") sorted.sort((a, b) => a.price - b.price);
    if (sortOption === "priceHigh") sorted.sort((a, b) => b.price - a.price);
    if (sortOption === "bedLow") sorted.sort((a, b) => a.bedrooms - b.bedrooms);
    if (sortOption === "bedHigh") sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    if (sortOption === "newest")
      sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    return sorted;
  }

  // -------------------------
  // SEARCH / FILTER LOGIC
  // -------------------------
  function handleSearch() {
    let filtered = propertiesData;

    if (type) filtered = filtered.filter((p) => p.type === type);
    if (bedrooms)
      filtered = filtered.filter((p) => p.bedrooms === parseInt(bedrooms));
    if (minPrice)
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice)
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));
    if (postcode)
      filtered = filtered.filter((p) =>
        p.postcode.toLowerCase().includes(postcode.trim().toLowerCase())
      );

    if (startDate)
      filtered = filtered.filter(
        (p) => new Date(p.dateAdded) >= startDate
      );
    if (endDate)
      filtered = filtered.filter(
        (p) => new Date(p.dateAdded) <= endDate
      );

    // ⭐ APPLY SORT
    filtered = applySorting(filtered);

    setResults(filtered);
  }

  // -------------------------
  // RE-SORT WHEN sortOption CHANGES
  // -------------------------
  useEffect(() => {
    if (results.length > 0) {
      setResults(applySorting(results));
    }
  }, [sortOption]);

  // -------------------------
  // CLEAR FILTERS
  // -------------------------
  function clearFilters() {
    setType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    setPostcode("");
    setStartDate(null);
    setEndDate(null);
    setResults([]);
  }

  // ---------------------------------------------------------
  // ------------------------- UI ----------------------------
  // ---------------------------------------------------------

  return (
    <div className="container-fluid p-0" style={{ background: "#f5f7fa" }}>
      {/* HERO BANNER */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={`${import.meta.env.BASE_URL}images/showcase1.jpg`}
              className="d-block w-100"
              style={{ height: "320px", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item">
            <img
              src={`${import.meta.env.BASE_URL}images/showcase2.jpg`}
              className="d-block w-100"
              style={{ height: "320px", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item">
            <img
              src={`${import.meta.env.BASE_URL}images/showcase3.jpg`}
              className="d-block w-100"
              style={{ height: "320px", objectFit: "cover" }}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* LUXURY BANNER */}
      <div className="py-4 text-center" style={{ background: "#fff" }}>
        <h2 className="fw-bold mb-2" style={{ fontSize: "32px" }}>
          Luxury Living
        </h2>
        <p
          style={{
            fontSize: "17px",
            color: "#555",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
          Beautiful homes with modern interiors and vibrant community spaces.
        </p>
      </div>

      <div className="row mx-0 mt-4 px-3">
        {/* LEFT SIDE */}
        <div className="col-lg-8 mb-4">
          {/* SEARCH BOX */}
          <div
            className="search-box mb-4"
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3 className="fw-bold mb-3">Property Search</h3>

            {/* FILTER FORM */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="fw-bold">Property Type</label>
                <Select
                  options={typeOptions}
                  value={typeOptions.find((opt) => opt.value === type)}
                  onChange={(s) => setType(s?.value || "")}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold">Bedrooms</label>
                <Select
                  options={bedroomOptions}
                  value={bedroomOptions.find((opt) => opt.value === bedrooms)}
                  onChange={(s) => setBedrooms(s?.value || "")}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold">Min Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold">Max Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold">Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold">Date Added (Between)</label>
                <div className="d-flex gap-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(d) => setStartDate(d)}
                    className="form-control"
                    placeholderText="Start"
                    dateFormat="yyyy-MM-dd"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(d) => setEndDate(d)}
                    className="form-control"
                    placeholderText="End"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <button className="btn btn-primary me-2" onClick={handleSearch}>
              Search
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          {/* RESULTS */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Results</h4>

            <select
              className="form-select w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="bedLow">Bedrooms: Fewest → Most</option>
              <option value="bedHigh">Bedrooms: Most → Fewest</option>
              <option value="newest">Newest Listings</option>
            </select>
          </div>

          <div className="row">
            {results.length === 0 ? (
              <p className="text-muted ms-2">No results yet. Try searching.</p>
            ) : (
              results.map((item) => (
                <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                  <PropertyCard property={item} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDE FAVOURITES */}
        <div
          className="col-lg-4 favourites-sidebar"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const data = JSON.parse(e.dataTransfer.getData("property"));
            addFavourite(data);
          }}
        >
          <div
            className="p-4"
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              minHeight: "380px",
            }}
          >
            <h4 className="fw-bold mb-3">⭐ Favourites</h4>

            <button
              className="btn btn-sm btn-danger mb-3"
              onClick={clearFavourites}
            >
              Clear All
            </button>

            {favourites.length === 0 ? (
              <p className="text-muted">Drag a property here to save it.</p>
            ) : (
              favourites.map((fav) => (
                <div
                  key={fav.id}
                  draggable
                  role="button"
                  aria-label={`Favourite property: ${fav.title}. Drag to remove`}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("fav-id", fav.id);
                  }}
                  className="p-3 mb-2"
                  style={{
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    cursor: "grab",
                  }}
                >
                  <strong>{fav.title}</strong>
                  <br />
                  £{fav.price.toLocaleString()}
                </div>
              ))
            )}
          </div>

          {/* TRASH ZONE */}
          <div
            role="region"
            aria-label="Remove favourite by dropping item here"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("fav-id");
              if (id) removeFavourite(parseInt(id));
            }}
            style={{
              marginTop: "15px",
              padding: "15px",
              textAlign: "center",
              background: "#ffe5e5",
              border: "2px dashed #ff4d4d",
              borderRadius: "10px",
              color: "#cc0000",
              fontWeight: "bold",
            }}
          >
            🗑️ Drag here to remove favourite
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
