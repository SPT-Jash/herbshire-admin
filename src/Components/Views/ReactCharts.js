import React, { useMemo } from "react";
import { Chart } from "react-charts";

export default function ReactCharts({ type, lineColor }) {
  const data = useMemo(
    () => [
      {
        label: "Onion",
        data: [
          [1, 1],
          [2, 2],
          [3, 4],
          [4, 2],
          [5, 7],
        ], // [7, 8], [8, 10], [9, 11], [10, 11], [11, 12]],
        color: "#2A9F85",
      },
      {
        label: "Tomato",
        data: [
          [1, 3],
          [2, 1],
          [3, 5],
          [4, 6],
          [5, 4],
        ], // [7, 9], [8, 9], [9, 10], [10, 12], [11, 13]]
      },
    ],
    []
  );
  console.log(lineColor);
  const orderData = useMemo(
    () => [
      {
        label: "Order",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
        color: lineColor,
      },
    ],
    []
  );
  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );
  const getMonth = (num) => {
    const n = parseFloat(num);
    if (n === 1) {
      return "January";
    } else if (n === 2) {
      return "February";
    } else if (n === 3) {
      return "March";
    } else if (n === 4) {
      return "April";
    } else if (n === 5) {
      return "May";
    } else if (n === 6) {
      return "June";
    } else if (n === 7) {
      return "July";
    } else if (n === 8) {
      return "August";
    } else if (n === 9) {
      return "September";
    } else if (n === 10) {
      return "October";
    } else if (n === 11) {
      return "November";
    } else if (n === 12) {
      return "December";
    }
  };
  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom", format: getMonth },
      { type: "linear", position: "left" },
    ],
    []
  );
  const noAxes = useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom",
        show: false,
        format: getMonth,
      },
      { type: "linear", position: "left", show: false },
    ],
    []
  );

  if (type === "normal") {
    return <Chart data={data} series={series} axes={axes} tooltip />;
  } else if (type === "small") {
    return <Chart data={orderData} series={series} axes={noAxes} tooltip />;
  }
}
