import React from "react";
import { renderHook, act } from "@testing-library/react";
import { FavouritesProvider, FavouritesContext } from "../../context/FavouritesContext";

describe("FavouritesContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a favourite", () => {
    const wrapper = ({ children }) => (
      <FavouritesProvider>{children}</FavouritesProvider>
    );

    const { result } = renderHook(() => React.useContext(FavouritesContext), {
      wrapper,
    });

    act(() => {
      result.current.addFavourite({ id: 1, title: "Test Property" });
    });

    expect(result.current.favourites.length).toBe(1);
  });

  it("prevents duplicate favourites", () => {
    const wrapper = ({ children }) => (
      <FavouritesProvider>{children}</FavouritesProvider>
    );

    const { result } = renderHook(() => React.useContext(FavouritesContext), {
      wrapper,
    });

    act(() => {
      result.current.addFavourite({ id: 1 });
      result.current.addFavourite({ id: 1 });
    });

    expect(result.current.favourites.length).toBe(1);
  });

  it("removes a favourite", () => {
    const wrapper = ({ children }) => (
      <FavouritesProvider>{children}</FavouritesProvider>
    );

    const { result } = renderHook(() => React.useContext(FavouritesContext), {
      wrapper,
    });

    act(() => {
      result.current.addFavourite({ id: 1 });
      result.current.removeFavourite(1);
    });

    expect(result.current.favourites.length).toBe(0);
  });

  it("clears all favourites", () => {
    const wrapper = ({ children }) => (
      <FavouritesProvider>{children}</FavouritesProvider>
    );

    const { result } = renderHook(() => React.useContext(FavouritesContext), {
      wrapper,
    });

    act(() => {
      result.current.addFavourite({ id: 1 });
      result.current.addFavourite({ id: 2 });
      result.current.clearFavourites();
    });

    expect(result.current.favourites.length).toBe(0);
  });
});
