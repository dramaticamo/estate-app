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

  // FILTER STATES  //
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPriceDisplay, setMinPriceDisplay] = useState("");
  const [maxPriceDisplay, setMaxPriceDisplay] = useState("");
  const [postcode, setPostcode] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // -------------------------
  // RESULTS + SORTING
  // -------------------------
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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
  setHasSearched(true);

  let filtered = propertiesData;

  if (type) filtered = filtered.filter(p => p.type === type);
  if (bedrooms) filtered = filtered.filter(p => p.bedrooms === parseInt(bedrooms));
  if (minPrice) filtered = filtered.filter(p => p.price >= parseInt(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
  if (postcode)
    filtered = filtered.filter(p =>
      p.postcode.toLowerCase().includes(postcode.toLowerCase())
    );

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
    setMinPriceDisplay("");
    setMaxPriceDisplay("");
    setPostcode("");
    setStartDate(null);
    setEndDate(null);
    setResults([]);
    setHasSearched(false);
  }

  // ---------------------------------------------------------
  // ------------------------- UI ----------------------------
  // ---------------------------------------------------------

  return (
    <div className="container-fluid p-0" style={{ background: "#f5f7fa" }}>
      {/* STATIC 3-IMAGE HERO SECTION */}
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "10px",
        padding: "0 12px",
        marginBottom: "25px"
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/showcase1.jpg`}
        alt="Showcase 1"
        style={{
          flex: 1,
          height: "260px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <img
        src={`${import.meta.env.BASE_URL}images/showcase2.jpg`}
        alt="Showcase 2"
        style={{
          flex: 1,
          height: "260px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <img
        src={`${import.meta.env.BASE_URL}images/showcase3.jpg`}
        alt="Showcase 3"
        style={{
          flex: 1,
          height: "260px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
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
                <div className="input-group">
                  <span className="input-group-text">£</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 100,000"
                    value={minPriceDisplay}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setMinPrice(raw);
                      setMinPriceDisplay(raw ? Number(raw).toLocaleString() : "");
                    }}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold">Max Price</label>
                <div className="input-group">
                  <span className="input-group-text">£</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 500,000"
                    value={maxPriceDisplay}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setMaxPrice(raw);
                      setMaxPriceDisplay(raw ? Number(raw).toLocaleString() : "");
                    }}
                  />
                </div>
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
            <h4 className="fw-bold" aria-live="polite">Results</h4>

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
              hasSearched ? (
              <p className="text-muted ms-2">
                No properties match your search criteria.
              </p>
            ) : (
              <p className="text-muted ms-2">
                Use the filters above and click Search to see results.
              </p>
            )
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
            try {
              const data = JSON.parse(e.dataTransfer.getData("property"));
              if (data && data.id) {
                addFavourite(data);
              }
            } catch {
              // ignore invalid drop data
            }
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
            <h4 className="fw-bold mb-3">
              <i className="bi bi-star-fill me-1"></i> Favourites
            </h4>

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
            padding: "18px",
            textAlign: "center",
            background: "rgba(255, 80, 80, 0.1)",
            border: "1px solid rgba(255, 80, 80, 0.3)",
            borderRadius: "14px",
            color: "#b00020",
            fontWeight: "600",
          }}
          >
            <i className="bi bi-trash-fill me-1"></i> Drag here to remove favourite
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
