import "./App.css";
import Dashboard from "./admin/ModuleDashboard/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav.jsx/BottomNav";
import Program from "./admin/ModuleInformation/Programs/Program";
import DataGridDemo from "./DataGrid";
import Header from "./components/BottomNav.jsx/Header";
import NotFound from "./components/BottomNav.jsx/NotFound";

function App() {
  return (
    <div className="pt-14 bg-gray-100 min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/admin/information" element={<DataGridDemo />} />
          <Route path="/admin/program" element={<Program />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </Router>
    </div>
  );
}

export default App;
