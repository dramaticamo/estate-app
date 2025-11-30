import React, { useState, useEffect, useContext } from "react";
import propertiesData from "../data/properties.json";
import PropertyCard from "../components/PropertyCard";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FavouritesContext } from "../context/FavouritesContext";

function SearchPage() {
  const { favourites, addFavourite, clearFavourites } = useContext(FavouritesContext);

  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [postcode, setPostcode] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  // SORTING
  useEffect(() => {
    if (results.length === 0) return;

    let sorted = [...results];

    if (sortOption === "priceLow") sorted.sort((a, b) => a.price - b.price);
    if (sortOption === "priceHigh") sorted.sort((a, b) => b.price - a.price);
    if (sortOption === "bedLow") sorted.sort((a, b) => a.bedrooms - b.bedrooms);
    if (sortOption === "bedHigh") sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    if (sortOption === "newest")
      sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    setResults(sorted);
  }, [sortOption]);

  // FILTERING
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

    if (startDate) filtered = filtered.filter((p) => new Date(p.dateAdded) >= startDate);
    if (endDate) filtered = filtered.filter((p) => new Date(p.dateAdded) <= endDate);

    setResults(filtered);
  }

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

  return (
    <div className="container-fluid p-0" style={{ background: "#f5f7fa" }}>
      {/* HERO BANNER */}
      <div className="row g-0">
        <img
          src="/images/showcase1.jpg"
          alt=""
          style={{
            width: "33.33%",
            height: "260px",
            objectFit: "cover",
          }}
        />
        <img
          src="/images/showcase2.jpg"
          alt=""
          style={{
            width: "33.33%",
            height: "260px",
            objectFit: "cover",
          }}
        />
        <img
          src="/images/showcase3.jpg"
          alt=""
          style={{
            width: "33.33%",
            height: "260px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* LUXURY BANNER */}
      <div className="py-4 text-center" style={{ background: "#fff" }}>
        <h2 className="fw-bold mb-2" style={{ fontSize: "32px" }}>
          Luxury Living
        </h2>
        <p style={{ fontSize: "17px", color: "#555", maxWidth: "650px", margin: "0 auto" }}>
          Beautiful homes with modern interiors and vibrant community spaces.
        </p>
      </div>

      <div className="row mx-0 mt-4 px-3">
        {/* LEFT CONTENT */}
        <div className="col-lg-8 mb-4">
          {/* SEARCH BOX */}
          <div
            className="p-4 mb-4"
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3 className="fw-bold mb-3">Property Search</h3>

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

            <button className="btn btn-primary me-2" onClick={handleSearch}>
              Search
            </button>
            <button className="btn btn-outline-secondary" onClick={clearFilters}>
              Clear
            </button>
          </div>

          {/* RESULTS */}
          <h4 className="fw-bold mb-3">Results</h4>

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

        {/* RIGHT SIDEBAR */}
        <div
          className="col-lg-4"
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

            <button className="btn btn-sm btn-danger mb-3" onClick={clearFavourites}>
              Clear All
            </button>

            {favourites.length === 0 ? (
              <p className="text-muted">Drag a property here to save it.</p>
            ) : (
              favourites.map((fav) => (
                <div
                  key={fav.id}
                  draggable
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
        </div>
      </div>
    </div>
  );
}

export default SearchPage;