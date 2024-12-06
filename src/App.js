import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DataLoading from "./pages/DataLoading";
import Graph from "./pages/Graph";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center  bg-gray-100 ">
        <nav className="w-full bg-blue-600 p-4 sticky top-0">
          <ul className="flex justify-center space-x-4 text-white">
            <li>
              <Link to="/dataloading" className="hover:underline">
                Data Loading
              </Link>
            </li>
            <li>
              <Link to="/graph" className="hover:underline">
                Graph
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-full max-w-4xl p-4">
          <Routes>
            <Route path="/dataloading" element={<DataLoading />} />
            <Route path="/graph" element={<Graph />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
