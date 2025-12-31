import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FavouritesContext } from "../../context/FavouritesContext";
import PropertyCard from "../PropertyCard";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockProperty = {
  id: 1,
  title: "Beautiful House",
  price: 450000,
  bedrooms: 3,
  postcode: "NW1",
  shortDescription: "A nice house.",
  images: ["/test.jpg"]
};

describe("PropertyCard Component", () => {
  const mockContext = {
    favourites: [],
    addFavourite: vi.fn(),
    removeFavourite: vi.fn()
  };

  it("renders property title", () => {
    render(
      <MemoryRouter>
        <FavouritesContext.Provider value={mockContext}>
          <PropertyCard property={mockProperty} />
        </FavouritesContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Beautiful House")).toBeInTheDocument();
  });

  it("renders property price", () => {
    render(
      <MemoryRouter>
        <FavouritesContext.Provider value={mockContext}>
          <PropertyCard property={mockProperty} />
        </FavouritesContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("£450,000")).toBeInTheDocument();
  });

  it("renders View Details link", () => {
    render(
      <MemoryRouter>
        <FavouritesContext.Provider value={mockContext}>
          <PropertyCard property={mockProperty} />
        </FavouritesContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /view details/i })).toBeInTheDocument();
  });

  it("calls addFavourite when Fav button is clicked", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <FavouritesContext.Provider value={mockContext}>
        <PropertyCard property={mockProperty} />
      </FavouritesContext.Provider>
    </MemoryRouter>
  );

  const favButton = screen.getByRole("button", { name: /fav/i });
  await user.click(favButton);

  expect(mockContext.addFavourite).toHaveBeenCalledWith(mockProperty);
});

  it("shows Remove button when property is already in favourites", () => {
    render(
      <MemoryRouter>
        <FavouritesContext.Provider
          value={{
            ...mockContext,
            favourites: [mockProperty]
          }}
        >
          <PropertyCard property={mockProperty} />
        </FavouritesContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /remove/i })
    ).toBeInTheDocument();
  });
});