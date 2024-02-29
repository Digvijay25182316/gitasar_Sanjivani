import React, { useState } from "react";

import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  Bars3Icon,
  CalendarDaysIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  UserGroupIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "../assets/MenuIcon.svg";

const Slider = () => {
  const { pathname } = useLocation();
  const [isSliderOpen, setSliderOpen] = useState(false);

  const toggleSlider = () => {
    setSliderOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden">
      <button
        className={`rounded-full focus:outline-none md:hidden p-2`}
        onClick={toggleSlider}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <aside
        className={`fixed top-0 left-0 w-full bg-white transition-transform z-[2000] ${
          isSliderOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        } transition-transform duration-300 ease-in-out backdrop-brightness-50`}
      >
        <div className="fixed left-0 top-10 min-h-screen screen w-full bg-white py-10 flex flex-col gap-3 font-nunito-sans text-gray-500 border">
          <button
            className={`rounded-full focus:outline-none md:hidden px-5 py-2 absolute top-0 right-0`}
            onClick={toggleSlider}
          >
            <img src={MenuIcon} alt="Menu" className="h-6 w-6" />
          </button>
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
          <Link to={"/admin/information/sadhana"}>
            <div
              className={`flex items-center text-lg transition-all duration-500 ${
                pathname.startsWith("/admin/information/sadhana")
                  ? "bg-gray-100 text-blue-700 border rounded-lg  border-gray-300"
                  : "text-gray-500 hover:bg-gray-100 rounded-lg"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <SparklesIcon className="h-6 w-6" />
              </p>
              <p>Participants</p>
            </div>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Slider;
