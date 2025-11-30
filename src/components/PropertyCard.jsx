import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContext";

function PropertyCard({ property }) {
  const { favourites, addFavourite, removeFavourite } =
    useContext(FavouritesContext);

  const isFav = favourites.some((p) => p.id === property.id);

  // DRAG — send property data to sidebar
  const handleDragStart = (e) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
  };

  return (
    <div
      className="property-card shadow-sm"
      draggable="true"
      onDragStart={handleDragStart}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #ddd",
        cursor: "grab",
        transition: "0.2s",
      }}
    >
      {/* IMAGE */}
      <img
        src={property.images[0]}
        alt={property.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
        }}
      />

      {/* CONTENT */}
      <div style={{ padding: "15px" }}>
        {/* TITLE */}
        <h5 className="fw-bold">{property.title}</h5>

        {/* SHORT DESCRIPTION */}
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            minHeight: "45px",
          }}
        >
          {property.shortDescription}
        </p>

        {/* PRICE */}
        <p style={{ fontWeight: "bold", color: "green", marginBottom: "6px" }}>
          £{property.price.toLocaleString()}
        </p>

        {/* BEDROOMS + POSTCODE */}
        <p style={{ fontSize: "14px", marginBottom: "2px" }}>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p style={{ fontSize: "14px" }}>
          <strong>Postcode:</strong> {property.postcode}
        </p>

        {/* BUTTONS */}
        <div className="d-flex gap-2 mt-3">
          <Link
            to={`/property/${property.id}`}
            className="btn btn-primary btn-sm w-100"
          >
            View Details
          </Link>

          {!isFav ? (
            <button
              className="btn btn-outline-primary btn-sm w-100"
              onClick={() => addFavourite(property)}
            >
              🤍 Fav
            </button>
          ) : (
            <button
              className="btn btn-danger btn-sm w-100"
              onClick={() => removeFavourite(property.id)}
            >
              ❤️ Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;