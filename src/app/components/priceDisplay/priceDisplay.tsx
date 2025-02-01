"use client";

import { useEffect, useState } from "react";
import { getPriceData } from "../../api/endpoint";
import { PriceIndex } from "@/app/types";
import { mapPriceDetailsToEntries } from "@/app/helpers/PriceDetailMapper";
import Table from "../table/table";
import PriceDataFilter from "../priceDataFilter/priceDataFilter";
import Pagination from "../pagination/pagination";
import CustomChart from "../chart/chart";

export default function PriceDisplay() {
  const PageSize = 10;

  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [priceData, setPriceData] = useState<Array<PriceIndex> | null>(null);
  const [filteredPriceData, setFilteredPriceData] = useState<any>(null);
  const [paginatedData, setPaginatedData] = useState<Array<PriceIndex>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setIsLoading(true);
        const fetchedPriceData = await getPriceData();

        const mappedStockItems = mapPriceDetailsToEntries(fetchedPriceData);

        setPriceData(mappedStockItems);
        setFilteredPriceData(mappedStockItems);
        setPaginatedData(mappedStockItems.slice(0, PageSize));
      } catch (error) {
        if (error instanceof Error) {
          setApiError(`Failed to get price data from api: ${error.message}`);
        }

        setApiError("Unknown error occured when fetching price data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceData();
  }, []);

  const filterData = (filteredData: Array<PriceIndex>) => {
    setFilteredPriceData(filteredData);
    setCurrentPage(1); //Reset as filters have been applied
    setPaginatedData(filteredData.slice(0, PageSize));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    setPaginatedData(filteredPriceData.slice(startIndex, endIndex)); // Show new page
  };

  //Bail out early if an error occured
  if (apiError) {
    return (
      <div>
        <p>{apiError}</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading && <p>Loading stock data...please wait</p>}
      {priceData && !isLoading ? (
        <>
          <PriceDataFilter
            dataToFilter={priceData}
            filterDataCallback={filterData}
          />
          <Table data={paginatedData}></Table>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredPriceData.length}
            pageSize={PageSize}
            onPageChange={handlePageChange}
          />
          <CustomChart data={filteredPriceData} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
