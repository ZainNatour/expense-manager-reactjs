import React from "react";
import { Bar } from "react-chartjs-2";

function Test() {
  return (
    <div>
      <h2>Test Chart</h2>
      <Bar
        data={{
          labels: ["A", "B", "C"],
          datasets: [
            {
              label: "Test Data",
              data: [1, 2, 3],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        }}
        options={{
          scales: {
            y: {
              type: "linear",
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default Test;
