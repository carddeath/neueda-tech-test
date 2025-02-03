"use client";

import { PriceIndex } from "@/app/types";
import { useEffect, useState } from "react";
import styles from "./priceDataFilter.module.css";
import CustomButton from "../customButton/customButton";

type DataFilterProps = {
  dataToFilter: Array<PriceIndex>;
  filterDataCallback: (filteredData: Array<PriceIndex>) => void;
};

export default function PriceDataFilter({
  dataToFilter,
  filterDataCallback,
}: DataFilterProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [sortBy, setSortBy] = useState<keyof PriceIndex>("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    filterData();
  }, [sortBy, sortOrder]);

  const filterData = () => {
    const newFilteredData = dataToFilter.filter((dataPoint) => {
      const timestamp = new Date(dataPoint.timestamp).getTime();
      const startTimestamp = startDate
        ? new Date(startDate).getTime()
        : -Infinity;
      const endTimestamp = endDate ? new Date(endDate).getTime() : Infinity;

      return timestamp >= startTimestamp && timestamp <= endTimestamp;
    });

    const sortedData = sortData(newFilteredData);

    filterDataCallback(sortedData);
  };

  const sortData = (data: Array<PriceIndex>) => {
    return [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as keyof PriceIndex;
    setSortBy(newSortBy);
  };

  const handleSortChangeClicked = (order: "asc" | "desc") => {
    if (sortOrder !== order) {
      setSortOrder(order);
    }
  };

  return (
    <div className={styles.filterRow}>
      <div className={styles.dateFilterContainer}>
        <label>
          Start Date:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <CustomButton
          onClickEvent={() => filterData}
          disabled={false}
          buttonText="Filter"
        />
      </div>
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="timestamp">Timestamp</option>
          <option value="volume">Volume</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <CustomButton
          onClickEvent={() => handleSortChangeClicked("asc")}
          disabled={sortOrder === "asc"}
          buttonText="Sort Descending"
        />
        <CustomButton
          onClickEvent={() => handleSortChangeClicked("desc")}
          disabled={sortOrder === "desc"}
          buttonText="Sort Descending"
        />
      </div>
    </div>
  );
}
