import React from "react";
import {
  ChartPieIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin"))
    return (
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white">
        <div className="flex items-center justify-evenly">
          <Link to={"/admin/information/program"} title="information">
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/information")
                  ? "border-t-2 border-t-blue-700 text-blue-700  py-3"
                  : "text-gray-400 py-3"
              }`}
            >
              <CircleStackIcon className={`h-6 w-6 `} />
            </p>
          </Link>
          <Link to={"/admin/home"} title="home">
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/home")
                  ? "border-t-2 border-t-blue-700 text-blue-700  py-3 "
                  : "text-gray-400"
              }`}
            >
              <HomeIcon className={`h-6 w-6 `} />
            </p>
          </Link>
          <Link to={"/admin/dashboard"} title="dashboard">
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/dashboard")
                  ? "border-t-2 border-t-blue-700 text-blue-700  py-3 "
                  : "text-gray-400"
              }`}
            >
              <ChartPieIcon className={`h-6 w-6 `} />
            </p>
          </Link>
          <Link to={"/admin/settings"} title="settings">
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/settings")
                  ? "border-t-2 border-t-blue-700 text-blue-700  py-3 "
                  : "text-gray-400"
              }`}
            >
              <Cog6ToothIcon className={`h-6 w-6 `} />
            </p>
          </Link>
        </div>
      </div>
    );
}

export default BottomNav;
