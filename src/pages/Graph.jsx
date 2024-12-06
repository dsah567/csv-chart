import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";

const GraphPage = () => {

    //convert string data to number
    function convertToNumberArray(data) {
        return data.map((row, index) => {
          // Leave the first row (index 0) unchanged
          if (index === 0) {
            return row;
          }
      
          // Convert all elements in the row to numbers
          return row.map((value) => {
            const num = Number(value);
            // Check if the conversion is valid
            if (isNaN(num)) {
              throw new Error(`Invalid number at row ${index + 1}`);
            }
            return num;
          });
        });
      }

  const [view, setView] = useState("graph"); 
  const { csvData } = useSelector((state) => state.data); // Fetch data from Redux

  let result;

  try {
    result = convertToNumberArray(csvData);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }

  console.log(result);

  // Handle cases when there's no data
  if (!csvData || csvData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-lg font-semibold text-red-500">
          No data available. Please upload a CSV file first.
        </p>
      </div>
    );
  }

  // Chart options
  const options = {
    title: "Data Visualization",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Graph & Chart Visualization</h1>


      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setView("graph")}
          className={`px-4 py-2 border rounded-md ${
            view === "graph" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show Graph
        </button>
        <button
          onClick={() => setView("chart")}
          className={`px-4 py-2 border rounded-md ${
            view === "chart" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show Chart
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-md p-4 rounded-lg">
        {view === "graph" ? (
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={result}
            options={options}
          />
        ) : (
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={result}
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default GraphPage;
