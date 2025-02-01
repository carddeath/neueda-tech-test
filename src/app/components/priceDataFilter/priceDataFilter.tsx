"use client";

import { PriceIndex } from "@/app/types";
import { useState } from "react";
import styles from "./priceDataFilter.module.css";

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

  const handleSortChangeClicked = (sortOrder: "asc" | "desc") => {
    setSortOrder(sortOrder);
    filterData();
  };

  return (
    <div className={styles.filterRow}>
      <div>
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
        <button className={styles.buttonWrapper} onClick={filterData}>
          Filter
        </button>
      </div>
      <div>
        <label>Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as keyof PriceIndex)}
        >
          <option value="timestamp">Timestamp</option>
          <option value="volume">Volume</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>

        <button
          className={styles.buttonWrapper}
          onClick={() => handleSortChangeClicked("asc")}
        >
          Sort Ascending
        </button>
        <button
          className={styles.buttonWrapper}
          onClick={() => handleSortChangeClicked("desc")}
        >
          Sort Descending
        </button>
      </div>
    </div>
  );
}
