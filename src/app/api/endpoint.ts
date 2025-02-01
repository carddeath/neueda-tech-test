import { PriceDetails } from "./types";

const endpointUrl =
  "https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=C";

export const getPriceData = async (): Promise<PriceDetails> => {
  try {
    const priceDataResponse = await fetch(endpointUrl);

    if (!priceDataResponse.ok) {
      throw new Error(
        `Error occured when fetching price data: ${priceDataResponse.status}`
      );
    }

    return priceDataResponse.json();
  } catch (possibleError: unknown) {
    if (possibleError instanceof Error) {
      throw possibleError;
    }

    throw new Error("Failed to fetch price data with an unknown error");
  }
};
