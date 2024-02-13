import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  LinkIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
  QueueListIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import CopyClipBoard from "../../../components/BottomNav.jsx/CopyClipBoard";
import QrCode from "./QrCode";
import ViewPageController from "./ViewPageController";
import CourseModal from "./CourseModal";
import Slider from "../../../components/MdLeftHeaderSlider";
import { FRONTEND_ENDPOINT, SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";

function CourseLevel() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [OpenCourseLevel, setOpenCourseLevel] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [coursesArr, setCoursesArr] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/level/`);
        if (response.ok) {
          const responseData = await response.json();
          setCoursesArr(responseData.content);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
    <>
      <div className="flex items-center max-w-screen bg-white">
        <Sidebar />
        <div className="md:w-[80vw] bg-gray-50 min-h-screen w-screen">
          {!isLoading ? (
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
              <div className="flex items-center bg-white md:mx-5 mx-2 mt-2 md:px-5 px-2 md:py-5 py-2 rounded-2xl justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="px-2 border py-1 rounded-md transition-all duration-300 text-gray-600 font-semibold hover:bg-gray-100 shadow hover:scale-105 text-sm"
                    onClick={ClearSelection}
                  >
                    clear selection
                  </button>
                  <button className="px-2 border py-1 rounded-md transition-all duration-300 bg-red-100 text-red-600 font-semibold hover:bg-red-200 shadow hover:scale-105 text-sm">
                    Delete
                  </button>
                </div>
                <button
                  className="bg-blue-700 text-white md:text-lg md:px-4 md:py-1.5 px-2 py-1 rounded-xl shadow-lg"
                  onClick={() => setOpenCourseLevel(true)}
                >
                  + New Course
                </button>
              </div>
              <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow">
                <div className="flex items-center justify-between border-b">
                  <p className=" px-2 py-1 font-semibold text-gray-600">
                    Course Level
                  </p>
                  {selectedItem > 0 && (
                    <ViewPageController
                      currentPage={currentPage}
                      setPage={setPage}
                      selected={selected}
                      courseData={selectedItem}
                      id={selectedItem}
                    />
                  )}
                </div>
                <div className="mx-2 my-1 border rounded-lg overflow-x-scroll no-scrollbar lg:w-[75vw] md:w-[73vw] w-[93vw]">
                  <table>
                    <thead>
                      <tr>
                        <th className="font-normal border-r border-b py-1">
                          Select
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1">
                            Program Name
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"programName"}
                              selected={doesFieldExists(
                                queryArr,
                                "programName"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("programName")
                              }
                            />
                          </div>
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1">
                            Course Name
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"courseLevel"}
                              selected={doesFieldExists(
                                queryArr,
                                "courseLevel"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("courseLevel")
                              }
                            />
                          </div>
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1">
                            preacher
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"preacher"}
                              selected={doesFieldExists(queryArr, "preacher")}
                              removeFilter={() => removeObjectByKey("preacher")}
                            />
                          </div>
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1">
                            mentor
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"mentor"}
                              selected={doesFieldExists(queryArr, "mentor")}
                              removeFilter={() => removeObjectByKey("mentor")}
                            />
                          </div>
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1">
                            coordinator
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"coordinator"}
                              selected={doesFieldExists(
                                queryArr,
                                "coordinator"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("coordinator")
                              }
                            />
                          </div>
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1">
                            Status
                            <Dropdown
                              origin={"origin-top-right"}
                              position={"right-0"}
                              setvalue={AddFilter}
                              fieldname={"status"}
                              selected={doesFieldExists(queryArr, "status")}
                              removeFilter={() => removeObjectByKey("status")}
                            />
                          </div>
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1 px-5">
                            Attendance Links
                          </div>
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-max py-1 px-5">
                            Activities Links
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {coursesArr?.map((courseLevel, index) => (
                        <tr key={index + 1} className="border-b">
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
                          <td className="border-l">
                            {courseLevel?.programName}
                          </td>
                          <td className="border-l">{courseLevel?.name}</td>
                          <td className="border-l">{courseLevel?.preacher1}</td>
                          <td className="border-l">{courseLevel?.mentor}</td>
                          <td className="border-l">
                            {courseLevel?.coordinator}
                          </td>
                          <td className="border-l border-r">
                            {courseLevel?.status}
                          </td>
                          <td className="border-r">
                            <div className="flex items-center gap-5 justify-center">
                              <a
                                href={`${FRONTEND_ENDPOINT}/attendence/${courseLevel?.id}`}
                                className=" hover:underline   text-blue-700 flex items-center gap-2 justify-center"
                              >
                                <LinkIcon className="h-4 w-4" />
                                Link
                              </a>
                              <CopyClipBoard
                                url={`${FRONTEND_ENDPOINT}/attendence/${courseLevel?.id}`}
                              />
                              <QrCode
                                url={`${FRONTEND_ENDPOINT}/attendence/${courseLevel.id}`}
                                courseCode={courseLevel.programName}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-5 justify-center">
                              <a
                                href={`${FRONTEND_ENDPOINT}/activities/${courseLevel.id}`}
                                className=" hover:underline   text-blue-700 flex items-center gap-2 justify-center"
                              >
                                <LinkIcon className="h-4 w-4" />
                                Link
                              </a>
                              <CopyClipBoard
                                url={`${FRONTEND_ENDPOINT}/activities/${courseLevel.id}`}
                              />
                              <QrCode
                                url={`${FRONTEND_ENDPOINT}/activities/${courseLevel.id}`}
                                courseCode={courseLevel.programName}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-screen flex items-center justify-center">
              <div className="animate-spin">
                <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
              </div>
            </div>
          )}
        </div>
        <CreateCourse
          OpenCourseLevel={OpenCourseLevel}
          setOpenCourseLevel={setOpenCourseLevel}
        />
      </div>
    </>
  );
}

export default CourseLevel;

const CreateCourse = ({ OpenCourseLevel, setOpenCourseLevel }) => {
  const [selectedProgramName, setSelectedProgramName] = useState("");
  const [SingleProgram, setSingleProgram] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [programArr, setProgramArr] = useState([]);
  const [createCourseLoading, setCreateCourseLoading] = useState(false);

  const formRef = useRef();

  const handleChange = async (e) => {
    if (e.target.value !== "") {
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/program/name/${e.target.value}`
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setSingleProgram(responseData);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    formData.append("number", 1);

    if (Object.values(data).some((value) => value.trim() === "")) {
      toast.error("Please fill in all fields.");
      return;
    }
    data.number = 3;
    data.preacher1 = SingleProgram?.preacher;
    data.preacher2 = SingleProgram?.preacher;
    data.mentor = SingleProgram?.mentor;
    data.coordinator = SingleProgram?.coordinator;

    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_ENDPOINT}/level/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
      } else {
        const errorData = await response.json();
        setIsError(true);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/program/`);
        if (response.ok) {
          const data = await response.json();
          setProgramArr(data.content);
        } else {
          setIsError(true);
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };
    fetchPrograms();
  }, []);

  return (
    <CourseModal
      isOpen={OpenCourseLevel}
      setIsOpen={() => setOpenCourseLevel(false)}
    >
      <div>
        <button
          className="bg-red-100 text-red-700 w-max p-2 rounded-full h-max absolute right-2 top-2 z-[100]"
          onClick={() => setOpenCourseLevel(false)}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <div className="border-b p-2 px-5">
          <p className="text-lg font-semibold text-gray-600">Create Course</p>
        </div>
        <div className="md:w-[50vw] w-[85vw] p-5 mb-16">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  className={`font-semibold ${
                    isLoading ? "text-gray-300" : "text-gray-600"
                  }`}
                  htmlFor="programName"
                >
                  Select Program
                </label>
                <select
                  name="programName"
                  className={`border bg-white px-4 py-2 rounded-md transition-colors duration-500 ${
                    isLoading ? "outline-none" : "focus:outline-gray-400"
                  }`}
                  disabled={isLoading}
                  onChange={handleChange}
                >
                  <option value="">select</option>
                  {programArr.length > 0 ? (
                    programArr.map((item) => (
                      <option value={item.name} key={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>NO program to show</option>
                  )}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className={`font-semibold ${
                    isLoading ? "text-gray-300" : "text-gray-600"
                  }`}
                  htmlFor="name"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Preferred Course Name"
                  className={`border ${
                    isLoading
                      ? "outline-none"
                      : "bg-white focus:outline-gray-400"
                  } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                  readOnly={isLoading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className={`font-semibold ${
                    isLoading ? "text-gray-300" : "text-gray-600"
                  }`}
                  htmlFor="description"
                >
                  Course Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Your Preferred Course Description"
                  className={`border ${
                    isLoading
                      ? "outline-none"
                      : "bg-white focus:outline-gray-400"
                  } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                  readOnly={isLoading}
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className={`font-semibold ${
                      isLoading ? "text-gray-300" : "text-gray-600"
                    }`}
                    htmlFor="expectedStartDate"
                  >
                    Expected Start Date
                  </label>
                  <input
                    type="date"
                    name="expectedStartDate"
                    className={`border ${
                      isLoading
                        ? "outline-none"
                        : "bg-white focus:outline-gray-400"
                    } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                    readOnly={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className={`font-semibold ${
                      isLoading ? "text-gray-300" : "text-gray-600"
                    }`}
                    htmlFor="expectedEndDate"
                  >
                    Expected End Date
                  </label>
                  <input
                    type="date"
                    name="expectedEndDate"
                    className={`border ${
                      isLoading
                        ? "outline-none"
                        : "bg-white focus:outline-gray-400"
                    } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                    readOnly={isLoading}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white rounded-b-2xl">
                <button
                  className={`w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border ${
                    isLoading && "text-gray-400"
                  }`}
                  type="button"
                  onClick={() => setOpenCourseLevel(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className={`${
                    isLoading ? "bg-blue-400" : "bg-blue-700"
                  } w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white`}
                  type="submit"
                  disabled={isLoading}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CourseModal>
  );
};
