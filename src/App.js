import "./App.css";
import Dashboard from "./admin/ModuleDashboard/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav.jsx/BottomNav";
import Program from "./admin/ModuleInformation/Programs/Program";
import Header from "./components/BottomNav.jsx/Header";
import NotFound from "./components/BottomNav.jsx/NotFound";
import CourseM from "./admin/ModuleInformation/Courses/CourseM";
import Activities from "./admin/ModuleInformation/Activities/Activities";
import CourseLevel from "./admin/ModuleInformation/CourseLevel/CourseLevel";
import Home from "./admin/ModuleHome/Home";
import Settings from "./admin/ModuleSettings/Settings";

function App() {
  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/admin/information/program" element={<Program />} />
          <Route path="/admin/information/mcourse" element={<CourseM />} />
          <Route
            path="/admin/information/activities"
            element={<Activities />}
          />
          <Route
            path="/admin/information/course-level"
            element={<CourseLevel />}
          />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </Router>
    </div>
  );
}

export default App;
