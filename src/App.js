import DataGrid from "./DataGrid";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<DataGrid />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
