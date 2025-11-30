import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";

function FavouritesPage() {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="container py-5">

      {/* Back Button */}
      <Link to="/" className="btn btn-secondary mb-4">
        ← Back to Search
      </Link>

      <h1 className="text-center mb-4 fw-bold">Your Favourite Properties</h1>

      {/* Empty State */}
      {favourites.length === 0 && (
        <div className="text-center mt-5">
          <h4 className="text-muted">You haven't added any favourites yet.</h4>
        </div>
      )}

      {/* Favourites Grid */}
      <div className="row mt-4">
        {favourites.map((property) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={property.id}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default FavouritesPage;