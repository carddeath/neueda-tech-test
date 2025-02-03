"use client";

import { PriceIndex } from "@/app/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from "./chart.module.css";

type ChartProps = {
  data: Array<PriceIndex>;
};

export default function CustomChart({ data }: ChartProps) {
  const highValues = data.map((dataElement) => ({
    timestamp: dataElement.timestamp,
    high: dataElement.high,
  }));

  return (
    <ResponsiveContainer className={styles.padder} height={300}>
      <LineChart
        data={highValues.splice(0, 10)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey="timestamp" />
        <YAxis dataKey="high" />
        <Tooltip
          contentStyle={{ backgroundColor: "#222", color: "#fff" }}
          itemStyle={{ color: "#00ffff" }}
          labelStyle={{ color: "#00ffff" }}
        />
        <Line type="monotone" dataKey="high" stroke="#00ffff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
