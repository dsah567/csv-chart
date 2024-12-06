import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCSVData, setError } from "../app/slices/dataSlice";
import csv from "csvtojson";

const DataLoading = () => {
  const dispatch = useDispatch();
  const { csvData, error } = useSelector((state) => state.data);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      dispatch(setError("Only CSV files are allowed."));
      return;
    }

    // Read CSV file
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvContent = event.target.result;

      try {
        // Convert CSV to JSON
        const jsonData = await csv({
            noheader:true,
            output: "csv"
        }).fromString(csvContent);
        dispatch(setCSVData(jsonData)); // Store JSON data in Redux
      } catch (err) {
        dispatch(setError("Failed to parse CSV file."));
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Data Loading</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded-md"
      />

      {error && <p className="text-red-500">{error}</p>}

      {csvData && (
        <div className="mt-4 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Uploaded JSON Data:</h2>
          <div className="overflow-x-auto border rounded-md p-2 bg-gray-100 text-sm">
            <pre>{JSON.stringify(csvData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataLoading;
