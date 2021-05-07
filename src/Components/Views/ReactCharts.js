import React, { useMemo } from "react";
import { Chart } from "react-charts";
import { Box } from "@chakra-ui/react";

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
    if (num == 1) {
      return "January";
    } else if (num == 2) {
      return "February";
    } else if (num == 3) {
      return "March";
    } else if (num == 4) {
      return "April";
    } else if (num == 5) {
      return "May";
    } else if (num == 6) {
      return "June";
    } else if (num == 7) {
      return "July";
    } else if (num == 8) {
      return "August";
    } else if (num == 9) {
      return "September";
    } else if (num == 10) {
      return "October";
    } else if (num == 11) {
      return "November";
    } else if (num == 12) {
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

  if (type == "normal") {
    return <Chart data={data} series={series} axes={axes} tooltip />;
  } else if (type == "small") {
    return <Chart data={orderData} series={series} axes={noAxes} tooltip />;
  }
}
