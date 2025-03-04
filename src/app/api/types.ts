export type PriceDetails = {
  price_data: {
    close: Array<number>;
    high: Array<number>;
    low: Array<number>;
    open: Array<number>;
    timestamp: Array<string>;
    volume: Array<number>;
  };
  ticker: string;
};
