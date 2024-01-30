import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  Bars3BottomLeftIcon,
  CalendarDaysIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

const Slider = () => {
  const { pathname } = useLocation();
  const [isSliderOpen, setSliderOpen] = useState(false);

  const toggleSlider = () => {
    setSliderOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        className={`rounded-full focus:outline-none md:hidden p-2`}
        onClick={toggleSlider}
      >
        <Bars3BottomLeftIcon className="h-6 w-6" />
      </button>
      <div
        className={
          isSliderOpen
            ? "fixed top-0 left-0 right-0 bottom-0 min-h-screen z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
            : ""
        }
        onClick={toggleSlider}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full sm:w-2/5 w-4/5 shadow-lg bg-white text-white transition-transform z-[2000] ${
          isSliderOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        } transition-transform duration-300 ease-in-out backdrop-brightness-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 bg-gray-100 focus:outline-none hover:bg-purple-100 p-2 rounded-full text-xl"
          onClick={toggleSlider}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="py-10 flex flex-col gap-5">
          <Link to={"/admin/information/program"} onClick={toggleSlider}>
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
          <Link to={"/admin/information/mcourse"} onClick={toggleSlider}>
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
          <Link to={"/admin/information/activities"} onClick={toggleSlider}>
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
          <Link to={"/admin/information/course-level"} onClick={toggleSlider}>
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
        </div>
      </aside>
    </div>
  );
};

export default Slider;
