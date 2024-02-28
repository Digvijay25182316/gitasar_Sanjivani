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
import Volunteers from "./admin/ModuleInformation/Volunteers/Volunteers";
import Participants from "./admin/ModuleInformation/Participants/Participants";
import Home from "./admin/ModuleHome/Home";
import Settings from "./admin/ModuleSettings/Settings";
import Attendence from "./participants/attendence/Attendence";
import ParticipantsActivities from "./participants/activities/ParticipantsActivities";
import ParticipantRegisteration from "./participants/attendence/Registeration";
import ActivitiesM from "./admin/ModuleInformation/ActivitiesMaster/Activities";
import { Toaster } from "react-hot-toast";
import RSVPParticipant from "./participants/RSVP/RSVP";

function App() {
  return (
    <div className="pt-14 md:pb-4 pb-14 bg-gray-50 min-h-screen">
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
            path="/admin/information/mactivities"
            element={<ActivitiesM />}
          />
          <Route
            path="/admin/information/course-level"
            element={<CourseLevel />}
          />
          <Route
            path="/admin/information/volunteers"
            element={<Volunteers />}
          />
          <Route
            path="/admin/information/participants"
            element={<Participants />}
          />

          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/attendence/:levelId" element={<Attendence />} />
          <Route path="/rsvp/:levelId" element={<RSVPParticipant />} />
          <Route
            path="/activities/:programId"
            element={<ParticipantsActivities />}
          />
          <Route path="/registeration" element={<ParticipantRegisteration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </div>
  );
}

export default App;
