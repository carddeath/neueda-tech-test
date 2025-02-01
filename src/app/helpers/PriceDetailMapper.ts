import { PriceDetails } from "../api/types";
import { PriceIndex } from "../types";

export const mapPriceDetailsToEntries = (
  priceDetails: PriceDetails
): Array<PriceIndex> => {
  const stockPrices: Array<PriceIndex> = priceDetails.price_data.timestamp.map(
    (time, index) => {
      return {
        timestamp: time,
        close: priceDetails.price_data.close[index],
        high: priceDetails.price_data.high[index],
        low: priceDetails.price_data.low[index],
        open: priceDetails.price_data.open[index],
        volume: priceDetails.price_data.volume[index],
      };
    }
  );

  return stockPrices;
};
