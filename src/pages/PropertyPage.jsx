import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { FavouritesContext } from "../context/FavouritesContext";

function PropertyPage() {
  const { id } = useParams();
  const property = propertiesData.find((p) => p.id === parseInt(id));

  const [activeTab, setActiveTab] = useState("description");
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);

  if (!property) return <h2>Property not found</h2>;

  const isFav = favourites.some((p) => p.id === property.id);

  return (
    <div className="container-fluid p-0" style={{ background: "#fafafa" }}>

      {/* HERO IMAGE */}
      <div
        style={{
          width: "100%",
          height: "350px",
          backgroundImage: `url(${property.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="mb-4"
      ></div>

      {/* CONTENT */}
      <div className="container pb-5">

        <Link to="/" className="btn btn-secondary mb-3">← Back to Search</Link>

        <h1 className="fw-bold" style={{ fontSize: "32px" }}>{property.title}</h1>

        <h3 style={{ color: "green", fontWeight: "700" }}>
          £{property.price.toLocaleString()}
        </h3>

        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Postcode:</strong> {property.postcode}</p>

        {/* TABS */}
        <ul className="nav nav-tabs mt-4 flex-wrap">
          {["description", "floorplan", "gallery", "map"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* TAB CONTENT */}
        <div className="mt-4">

          {/* Description */}
          {activeTab === "description" && (
            <div>
              <h3>Description</h3>
              <p className="mt-3" style={{ lineHeight: "1.7", fontSize: "18px" }}>
                {property.longDescription}
              </p>
            </div>
          )}

          {activeTab === "floorplan" && (
          <div>
            <h3>Floorplan</h3>

            <img
              src={property.floorplan}
              alt="Floorplan"
              className="img-fluid mt-3"
              style={{
                borderRadius: "10px",
                maxHeight: "600px",
                objectFit: "contain",
                width: "100%",
                background: "#fff",
                padding: "10px",
                border: "1px solid #ddd"
              }}
            />
          </div>
        )}

          {/* Gallery */}
          {activeTab === "gallery" && (
            <div>
              <h3>Gallery</h3>
              <div className="row mt-3">
                {property.images.map((img, index) => (
                  <div className="col-6 col-md-4 mb-3" key={index}>
                    <img
                      src={img}
                      className="img-fluid rounded shadow-sm"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          {activeTab === "map" && (
            <div>
              <h3>Location Map</h3>
              <iframe
                width="100%"
                height="400"
                className="mt-3"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${property.location.lat},${property.location.lng}&hl=en&z=14&output=embed`}
              ></iframe>
            </div>
          )}
        </div>

        {/* FAVOURITE BUTTON */}
        {isFav ? (
          <button
            className="btn btn-danger mt-4"
            onClick={() => removeFavourite(property.id)}
          >
            ❤️ Remove from Favourites
          </button>
        ) : (
          <button
            className="btn btn-primary mt-4"
            onClick={() => addFavourite(property)}
          >
            🤍 Add to Favourites
          </button>
        )}
      </div>
    </div>
  );
}

export default PropertyPage;