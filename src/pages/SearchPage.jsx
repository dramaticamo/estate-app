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

  const [type, setType] = useState("");
  const typeOptions = [
    { value: "", label: "Any" },
    { value: "house", label: "House" },
    { value: "flat", label: "Flat" },
  ];

  const [bedrooms, setBedrooms] = useState("");
  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [postcode, setPostcode] = useState("");

  // NEW date range states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("");

  /* -------------------- SORTING -------------------- */
  useEffect(() => {
    if (results.length > 0) {
      let sorted = [...results];

      if (sortOption === "priceLow") sorted.sort((a, b) => a.price - b.price);
      if (sortOption === "priceHigh") sorted.sort((a, b) => b.price - a.price);
      if (sortOption === "bedLow") sorted.sort((a, b) => a.bedrooms - b.bedrooms);
      if (sortOption === "bedHigh") sorted.sort((a, b) => b.bedrooms - a.bedrooms);
      if (sortOption === "newest")
        sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

      setResults(sorted);
    }
  }, [sortOption]);

  /* -------------------- FILTERING -------------------- */
  function handleSearch() {
    let filtered = propertiesData;

    if (type) filtered = filtered.filter((p) => p.type === type);
    if (bedrooms) filtered = filtered.filter((p) => p.bedrooms === parseInt(bedrooms));
    if (minPrice) filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice) filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));

    if (postcode)
      filtered = filtered.filter((p) =>
        p.postcode.toLowerCase().includes(postcode.trim().toLowerCase())
      );

    // NEW — date range filtering  
    if (startDate)
      filtered = filtered.filter(
        (p) => new Date(p.dateAdded) >= startDate
      );

    if (endDate)
      filtered = filtered.filter(
        (p) => new Date(p.dateAdded) <= endDate
      );

    setResults(filtered);
  }

  /* -------------------- CLEAR FILTERS -------------------- */
  function clearFilters() {
    setType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    setPostcode("");

    setStartDate(null);
    setEndDate(null);

    setResults([]);
    setSortOption("");
  }

  /* -------------------- Drag & Drop -------------------- */
  const handleDropAdd = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("property"));
    addFavourite(data);
  };

  /* =============================================================
     PAGE LAYOUT
  ============================================================= */

  return (
    <div className="container-fluid p-0">
      <div className="row mx-0">

        {/* LEFT SIDE — SEARCH + RESULTS */}
        <div className="col-lg-8">

          {/* Showcase Images */}
          <div className="row g-0 showcase-row">
            <div className="col-12 d-flex">
              <img src="/images/showcase1.jpg" className="img-fluid"
                style={{ width: "33.33%", height: "300px", objectFit: "cover" }} />
              <img src="/images/showcase2.jpg" className="img-fluid"
                style={{ width: "33.33%", height: "300px", objectFit: "cover" }} />
              <img src="/images/showcase3.jpg" className="img-fluid"
                style={{ width: "33.33%", height: "300px", objectFit: "cover" }} />
            </div>
          </div>

          {/* Luxury Text */}
          <div className="text-center py-5" style={{ background: "#f9f4ed" }}>
            <h2 className="fw-bold" style={{ fontSize: "34px" }}>Luxury Living</h2>
            <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "18px" }}>
              Beautiful homes with modern interiors and vibrant community spaces.
            </p>
          </div>

          {/* Search Form */}
          <div className="container py-5">
            <h1 className="text-center mb-4">Property Search</h1>

            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-8">

                {/* Property Type */}
                <label className="fw-bold mb-1">Property Type:</label>
                <Select
                  className="mb-3"
                  options={typeOptions}
                  value={typeOptions.find((opt) => opt.value === type)}
                  onChange={(selected) => setType(selected?.value || "")}
                />

                {/* Bedrooms */}
                <label className="fw-bold mb-1">Bedrooms:</label>
                <Select
                  className="mb-3"
                  options={bedroomOptions}
                  value={bedroomOptions.find((opt) => opt.value === bedrooms)}
                  onChange={(selected) => setBedrooms(selected?.value || "")}
                />

                {/* Min & Max Price */}
                <label>Min Price:</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />

                <label>Max Price:</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />

                {/* Postcode */}
                <label>Postcode:</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />

                {/* NEW DATE RANGE */}
                <label className="fw-bold mb-1">Date Added (Between):</label>
                <div className="d-flex gap-2 mb-4">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    placeholderText="Start date"
                    dateFormat="yyyy-MM-dd"
                  />

                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                    placeholderText="End date"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>

                <button className="btn btn-primary me-2" onClick={handleSearch}>
                  Search
                </button>
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Clear
                </button>

              </div>
            </div>

            {/* Results */}
            <h2 className="text-center mt-5">Results</h2>
            <div className="row mt-4">
              {results.length === 0 ? (
                <p className="text-center">No results yet. Try searching.</p>
              ) : results.map((item) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={item.id}>
                  <PropertyCard property={item} />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT SIDE — FAVOURITES SIDEBAR */}
        <div className="col-lg-4 pt-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropAdd}
        >
          <div
            style={{
              background: "#fff",
              border: "2px dashed #aaa",
              padding: "20px",
              borderRadius: "12px",
              minHeight: "350px",
            }}
          >
            <h4 className="fw-bold">⭐ Favourites</h4>

            <button className="btn btn-sm btn-danger mb-3" onClick={clearFavourites}>
              Clear All
            </button>

            {favourites.length === 0 ? (
              <p className="text-muted">Drag a property here to save it.</p>
            ) : (
              favourites.map((fav) => (
                <div
                  key={fav.id}
                  draggable="true"
                  onDragStart={(e) =>
                    e.dataTransfer.setData("remove", JSON.stringify(fav))
                  }
                  style={{
                    background: "#f8f8f8",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
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
        </div>
      </div>
    </div>
  );
}

export default SearchPage;