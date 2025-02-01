"use client";

import { PriceIndex } from "@/app/types";
import styles from "./table.module.css";

const tableHeaders = ["Date", "Volume", "Open", "Close", "High", "Low"];

type TableProps = {
  data: Array<PriceIndex>;
};

export default function Table({ data }: TableProps) {
  return (
    <div>
      <table className={styles.tableWrapper}>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataPoint, index) => (
            <tr key={index}>
              <td>{dataPoint.timestamp.toString()}</td>
              <td>{dataPoint.volume}</td>
              <td>{dataPoint.open}</td>
              <td>{dataPoint.close}</td>
              <td>{dataPoint.high}</td>
              <td>{dataPoint.low}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
