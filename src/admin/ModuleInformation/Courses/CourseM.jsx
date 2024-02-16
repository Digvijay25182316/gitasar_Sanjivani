import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  UserIcon,
  QueueListIcon,
  CubeTransparentIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Slider from "../../../components/MdLeftHeaderSlider";
import UploadingFile from "./UploadingFile";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";

function CourseM() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [OpenPrograms, setOpenPrograms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [coursesArr, setCoursesArr] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      fetch(`${SERVER_ENDPOINT}/course/`)
        .then((data) => {
          if (data.ok) {
            return data.json();
          } else {
            setIsError(true);
            return data.json();
          }
        })
        .then((data) => {
          if (isError) {
            toast.error(data.message);
          } else {
            setCoursesArr(data.content);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, [isError, setIsError]);

  function AddFilter(data) {
    setQueryArr((prev) => [...prev, data]);
  }
  function doesFieldExists(array, propertyName) {
    return array?.some((obj) => obj.hasOwnProperty(propertyName));
  }

  function removeObjectByKey(data) {
    setQueryArr(queryArr.filter((item) => !Object.keys(item).includes(data)));
  }
  function onChangeSelect(e) {
    setSelectedItem(Number(e.target.value));
    setSelected(true);
  }
  function ClearSelection() {
    setSelectedItem(0);
    setSelected(false);
  }
  return (
    <div className="flex items-center max-w-screen bg-gray-50">
      <div className="md:w-[20vw] md:flex hidden">
        <Sidebar />
      </div>
      <div className="md:w-[79.5vw] min-h-screen w-screen">
        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin">
              <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center">
              <Slider />
              {pathname
                ?.split("/")
                .filter((item) => item !== "") // Filter out empty segments
                .map((item, index) => (
                  <div
                    className="flex items-center py-2"
                    key={`${item}-${index}`}
                  >
                    <p>
                      <ChevronRightIcon className="h-6 w-6" />
                    </p>
                    <p className="font-semibold text-blue-700">{item}</p>
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-between md:mx-5 py-2 px-2">
              <div className="flex items-center gap-3 bg-white text-gray-700 px-2 py-1 border rounded">
                <button onClick={ClearSelection}>clear selection</button>
              </div>
              <button
                onClick={() => setOpenPrograms(true)}
                className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
              >
                <PlusIcon className="h-4 w-4" /> New Course
              </button>
            </div>
            <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
              <div className="flex items-center justify-between border-b">
                <p className=" px-2 py-1 font-semibold text-gray-600">
                  Courses Master
                </p>
              </div>
              <div className="overflow-x-scroll lg:overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-6 font-semibold py-1">
                        Select
                      </th>

                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          Course Name
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            fieldname={"name"}
                            selected={doesFieldExists(queryArr, "name")}
                            removeFilter={() => removeObjectByKey("name")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          Course description
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            fieldname={"description"}
                            selected={doesFieldExists(queryArr, "description")}
                            removeFilter={() =>
                              removeObjectByKey("description")
                            }
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursesArr?.map((courseLevel, index) => (
                      <tr key={index + 1} className="border-b w-full">
                        <td className="flex justify-center py-5">
                          <input
                            type="checkbox"
                            value={index + 1}
                            className=" checked:text-green-400 text-green-400 cursor-pointer"
                            onChange={onChangeSelect}
                            disabled={selected}
                            checked={selectedItem === index + 1}
                          />
                        </td>
                        <td className="px-10">{courseLevel?.name}</td>
                        <td className="px-10">{courseLevel?.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <UploadingFile
        isOpen={OpenPrograms}
        setIsOpen={() => setOpenPrograms(false)}
      />
    </div>
  );
}

export default CourseM;
