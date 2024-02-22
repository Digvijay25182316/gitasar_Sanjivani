import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  FingerPrintIcon,
  HandRaisedIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="md:w-[20vw] md:flex hidden">
      <div className="fixed left-0 top-10 min-h-screen md:max-w-[20vw] w-full bg-white py-10 flex flex-col gap-3 font-nunito-sans text-gray-500 border">
        <Link to={"/admin/information/program"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/program")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <CalendarDaysIcon className="h-6 w-6" />
            </p>
            <p>Programs</p>
          </div>
        </Link>
        <Link to={"/admin/information/mcourse"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/mcourse")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <AcademicCapIcon className="h-6 w-6" />
            </p>
            <p>Course Master</p>
          </div>
        </Link>
        <Link to={"/admin/information/activities"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/activities")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <PresentationChartBarIcon className="h-6 w-6" />
            </p>
            <p>Activities</p>
          </div>
        </Link>
        <Link to={"/admin/information/mactivities"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/mactivities")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <QueueListIcon className="h-6 w-6" />
            </p>
            <p>Activities Master</p>
          </div>
        </Link>
        <Link to={"/admin/information/course-level"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/course-level")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <ArrowTrendingUpIcon className="h-6 w-6" />
            </p>
            <p>Course Level</p>
          </div>
        </Link>
        <Link to={"/admin/information/volunteers"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/volunteers")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <UserIcon className="h-6 w-6" />
            </p>
            <p>Volunteers</p>
          </div>
        </Link>
        <Link to={"/admin/information/participants"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/participants")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <UserGroupIcon className="h-6 w-6" />
            </p>
            <p>Participants</p>
          </div>
        </Link>
        <Link to={"/admin/information/attendence"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/attendence")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <FingerPrintIcon className="h-6 w-6" />
            </p>
            <p>Attendence</p>
          </div>
        </Link>
        <Link to={"/admin/information/rsvp"}>
          <div
            className={`flex items-center text-lg transition-all duration-500 ${
              pathname.startsWith("/admin/information/rsvp")
                ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                : "text-gray-500 hover:bg-gray-100 rounded-lg"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <HandRaisedIcon className="h-6 w-6" />
            </p>
            <p>Rsvp</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
