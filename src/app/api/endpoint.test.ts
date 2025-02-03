import { PriceDetails } from "./types";
import { getPriceData } from "./endpoint";
global.fetch = jest.fn(); // Mock fetch globally

describe("getPriceData", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return price data when the API call is successful", async () => {
    const mockData: PriceDetails = {
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

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getPriceData();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.any(String));
  });

  it("should throw an error when the API response is not OK", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn(),
    });

    await expect(getPriceData()).rejects.toThrow(
      "Error occured when fetching price data: 500"
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    await expect(getPriceData()).rejects.toThrow("Network Error");

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
