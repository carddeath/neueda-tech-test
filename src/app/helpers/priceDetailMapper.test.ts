import { PriceDetails } from "../api/types";
import { mapPriceDetailsToEntries } from "./PriceDetailMapper";

describe("priceDetailsMapper", () => {
  it("should map price details into price index entries", async () => {
    const priceDetailsToMap: PriceDetails = {
      price_data: {
        close: [100, 200],
        open: [50, 100],
        high: [120, 220],
        low: [50, 90],
        volume: [5000, 5500],
        timestamp: ["2025-01-28T10:30:00Z", "2025-01-28T10:35:00Z"],
      },
      ticker: "c",
    };

    const mappedResult = mapPriceDetailsToEntries(priceDetailsToMap);

    expect(mappedResult).toHaveLength(2);
    expect(mappedResult[0].close).toEqual(100);
    expect(mappedResult[0].open).toEqual(50);
    expect(mappedResult[0].high).toEqual(120);
    expect(mappedResult[0].low).toEqual(50);
    expect(mappedResult[0].volume).toEqual(5000);
    expect(mappedResult[0].timestamp).toEqual("2025-01-28T10:30:00Z");
  });
});
