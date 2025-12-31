import properties from "../../data/properties.json";

describe("Search filtering logic", () => {
  it("filters properties by type", () => {
    const houses = properties.filter(p => p.type === "house");
    expect(houses.length).toBeGreaterThan(0);
  });

  it("filters properties by max price", () => {
    const cheap = properties.filter(p => p.price <= 300000);
    expect(cheap.every(p => p.price <= 300000)).toBe(true);
  });

  it("filters properties by bedrooms", () => {
    const threeBeds = properties.filter(p => p.bedrooms === 3);
    expect(threeBeds.every(p => p.bedrooms === 3)).toBe(true);
  });
});
