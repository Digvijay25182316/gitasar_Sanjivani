import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="md:w-[20vw] md:flex hidden">
      <div className="fixed left-0 top-10 min-h-screen md:max-w-[19.7vw] w-full bg-white drop-shadow-lg py-10 flex flex-col gap-5 font-nunito-sans text-gray-500 ">
        <Link to={"/admin/information/program"}>
          <div
            className={`flex items-center text-lg ${
              pathname.startsWith("/admin/information/program")
                ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                : "text-gray-500"
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
            className={`flex items-center text-lg ${
              pathname.startsWith("/admin/information/mcourse")
                ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                : "text-gray-500"
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
            className={`flex items-center text-lg ${
              pathname.startsWith("/admin/information/activities")
                ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                : "text-gray-500"
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
            className={`flex items-center text-lg ${
              pathname.startsWith("/admin/information/mactivities")
                ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                : "text-gray-500"
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
            className={`flex items-center text-lg ${
              pathname.startsWith("/admin/information/course-level")
                ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                : "text-gray-500"
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
            className={`flex items-center text-lg ${
              pathname.startsWith("/admin/information/volunteers")
                ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                : "text-gray-500"
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
            className={`flex items-center text-lg ${
              pathname.startsWith("/admin/information/participants")
                ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                : "text-gray-500"
            }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
          >
            <p>
              <UserGroupIcon className="h-6 w-6" />
            </p>
            <p>Participants</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
