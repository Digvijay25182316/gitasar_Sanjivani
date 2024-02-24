import {
  ChevronRightIcon,
  LinkIcon,
  XMarkIcon,
  CubeTransparentIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import CopyClipBoard from "../../../components/BottomNav.jsx/CopyClipBoard";
import QrCode from "./QrCode";
import ViewPageController from "./ViewPageController";
import CourseModal from "./CourseModal";
import Slider from "../../../components/MdLeftHeaderSlider";
import { FRONTEND_ENDPOINT, SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";
import VolunteerDataCard from "./VolunteerDataCard";

function CourseLevel() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [OpenCourseLevel, setOpenCourseLevel] = useState(false);

  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [coursesArr, setCoursesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalElement, setTotalElements] = useState(0);
  const [VisibleElements, setVisibleElements] = useState(10);

  let url = `${SERVER_ENDPOINT}/level/`;
  if (queryArr.length > 0) {
    url +=
      "?" +
      queryArr
        .map(
          (param) =>
            `${Object.keys(param)}=${encodeURIComponent(
              param[Object.keys(param)]
            )}`
        )
        .join("&");
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (response.ok) {
          const responseData = await response.json();
          setCoursesArr(responseData.content);
          setTotalElements(responseData?.totalElements);
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
  }, [OpenCourseLevel, url]);

  function AddFilter(data) {
    // setQueryArr((prev) => [...prev, data]);
  }
  function doesFieldExists(array, propertyName) {
    // return array?.some((obj) => obj.hasOwnProperty(propertyName));
  }

  function removeObjectByKey(data) {
    // setQueryArr(queryArr.filter((item) => !Object.keys(item).includes(data)));
  }
  function onChangeSelect(e) {
    setSelectedItem(Number(e.target.value));
    setSelected(true);
  }
  function ClearSelection() {
    setSelectedItem(0);
    setSelected(false);
  }

  ///////////////////////////////// this section everything is about filtering and pagination etc
  //contents: pagination , search_parameter_management , sorting
  // Function to increase page by one

  const increasePage = () => {
    setQueryArr((prev) => {
      const pageIndex = prev.findIndex((item) => item.hasOwnProperty("page"));
      if (pageIndex !== -1) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[pageIndex] = {
          ...updatedQueryArr[pageIndex],
          page: updatedQueryArr[pageIndex].page + 1,
        };
        return updatedQueryArr;
      }
      return prev;
    });
    setVisibleElements((prev) => prev + 10);
  };

  // Function to decrease page by one
  const decreasePage = () => {
    setQueryArr((prev) => {
      const pageIndex = prev.findIndex((item) => item.hasOwnProperty("page"));
      if (pageIndex !== -1 && prev[pageIndex].page > 0) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[pageIndex] = {
          ...updatedQueryArr[pageIndex],
          page: updatedQueryArr[pageIndex].page - 1,
        };
        return updatedQueryArr;
      }
      return prev;
    });
    setVisibleElements((prev) => prev - 10);
  };
  //Function to sort
  const SortElements = (sortBy) => {
    setQueryArr((prev) => {
      const sortIndex = prev.findIndex((item) => item.hasOwnProperty("sort"));
      if (sortIndex !== -1) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[sortIndex] = {
          ...updatedQueryArr[sortIndex],
          sort: sortBy,
        };
        return updatedQueryArr;
      }
      return prev;
    });
  };

  ///////////////////////search params and filtering end
  return (
    <>
      <div className="flex items-center max-w-screen bg-white">
        <Sidebar />
        <div className="md:w-[79.5vw] bg-gray-50 min-h-screen w-screen">
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
              <div className="flex items-center justify-between md:mx-5 py-2 px-2">
                <div className="flex items-center gap-3 bg-white text-gray-700 px-2 py-1 border rounded">
                  <button onClick={ClearSelection}>clear selection</button>
                </div>
                <button
                  onClick={() => setOpenCourseLevel(true)}
                  className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
                >
                  <PlusIcon className="h-4 w-4" /> New Course
                </button>
              </div>
              <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
                <div className="flex items-center justify-between border-b">
                  <p className=" px-2 py-1 font-semibold text-gray-600">
                    Courses
                  </p>
                  {selectedItem > 0 ? (
                    <ViewPageController
                      totalElement={totalElement}
                      VisibleElements={VisibleElements}
                      selected={selected}
                      id={selectedItem}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="px-2 py-1  text-gray-400">{`${
                        totalElement < 10
                          ? totalElement
                          : VisibleElements > totalElement
                          ? totalElement
                          : VisibleElements
                      } of ${totalElement}`}</p>
                    </div>
                  )}
                </div>
                <div className="overflow-x-scroll">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border-b px-6 font-semibold py-1">
                          Select
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Program Name
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Course Name
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            preacher1
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            preacher2
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            mentor
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            coordinator
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Status
                            <Dropdown
                              origin={"origin-top-right"}
                              position={"right-0"}
                              setvalue={AddFilter}
                              setIsSort={SortElements}
                              issort={queryArr.some(
                                (obj) => obj.sort === "status"
                              )}
                              fieldname={"status"}
                              selected={doesFieldExists(queryArr, "status")}
                              removeFilter={() => removeObjectByKey("status")}
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1 px-5">
                            Attendance Links
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1 px-5">
                            RSVP Links
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1 px-5">
                            Activities Links
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {coursesArr?.length > 0 ? (
                      <tbody>
                        {coursesArr?.map((courseLevel, index) => (
                          <tr key={index + 1} className="border-b">
                            <td className="flex justify-center py-5">
                              <input
                                type="checkbox"
                                value={courseLevel.id}
                                className=" checked:text-green-400 text-green-400 cursor-pointer"
                                onChange={onChangeSelect}
                                disabled={selected}
                                checked={selectedItem === courseLevel.id}
                              />
                            </td>
                            <td className="text-center">
                              {courseLevel?.programName ? (
                                <div>{courseLevel?.programName}</div>
                              ) : (
                                <i className="text-gray-500">null</i>
                              )}
                            </td>
                            <td className="text-center">
                              {courseLevel?.name ? (
                                <div>{courseLevel?.name}</div>
                              ) : (
                                <i className="text-gray-500">null</i>
                              )}
                            </td>
                            <td className="text-center">
                              {courseLevel?.preacher1 ? (
                                <div>
                                  <VolunteerDataCard
                                    volunteer_id={courseLevel?.preacher1}
                                  />
                                </div>
                              ) : (
                                <i className="text-gray-500">null</i>
                              )}
                            </td>
                            <td className="text-center">
                              {courseLevel?.preacher2 ? (
                                <div>
                                  <VolunteerDataCard
                                    volunteer_id={courseLevel?.preacher2}
                                  />
                                </div>
                              ) : (
                                <i className="text-gray-500">null</i>
                              )}
                            </td>
                            <td className="text-center">
                              {courseLevel?.mentor ? (
                                <div>
                                  <VolunteerDataCard
                                    volunteer_id={courseLevel?.mentor}
                                  />
                                </div>
                              ) : (
                                <i className="text-gray-500">null</i>
                              )}
                            </td>
                            <td className="text-center">
                              {courseLevel?.coordinator ? (
                                <div>
                                  <VolunteerDataCard
                                    volunteer_id={courseLevel?.coordinator}
                                  />
                                </div>
                              ) : (
                                <i className="text-gray-500">null</i>
                              )}
                            </td>
                            <td className="text-center">
                              {courseLevel?.status ? (
                                <div>{courseLevel?.status}</div>
                              ) : (
                                <i className="text-gray-500">null</i>
                              )}
                            </td>
                            <td className="text-center">
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
                            <td className="text-center">
                              <div className="flex items-center gap-5 justify-center">
                                <a
                                  href={`${FRONTEND_ENDPOINT}/rsvp/${courseLevel?.id}`}
                                  className=" hover:underline   text-blue-700 flex items-center gap-2 justify-center"
                                >
                                  <LinkIcon className="h-4 w-4" />
                                  Link
                                </a>
                                <CopyClipBoard
                                  url={`${FRONTEND_ENDPOINT}/rsvp/${courseLevel?.id}`}
                                />
                                <QrCode
                                  url={`${FRONTEND_ENDPOINT}/rsvp/${courseLevel.id}`}
                                  courseCode={courseLevel.programName}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-5 justify-center">
                                <a
                                  href={`${FRONTEND_ENDPOINT}/activities/${courseLevel.programId}`}
                                  className=" hover:underline   text-blue-700 flex items-center gap-2 justify-center"
                                >
                                  <LinkIcon className="h-4 w-4" />
                                  Link
                                </a>
                                <CopyClipBoard
                                  url={`${FRONTEND_ENDPOINT}/activities/${courseLevel.programId}`}
                                />
                                <QrCode
                                  url={`${FRONTEND_ENDPOINT}/activities/${courseLevel.programId}`}
                                  courseCode={courseLevel.programName}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            colSpan={10}
                            className="text-center text-gray-400 py-10"
                          >
                            No Course Found
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
              <div className="px-5 flex items-center justify-between mt-6">
                <button
                  className={`flex items-center gap-3 text-lg bg-white px-4 py-1 rounded border ${
                    VisibleElements === 10 ? "text-gray-400" : "text-gray-700"
                  }`}
                  onClick={decreasePage}
                  disabled={VisibleElements === 10}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                  Prev
                </button>
                <button
                  className={`flex items-center gap-3 text-lg bg-white px-4 py-1 rounded border ${
                    VisibleElements > totalElement
                      ? "text-gray-400"
                      : "text-gray-700"
                  }`}
                  onClick={increasePage}
                  disabled={VisibleElements > totalElement}
                >
                  Next
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
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
          courseArrLength={coursesArr.length}
        />
      </div>
    </>
  );
}

export default CourseLevel;

const CreateCourse = ({
  OpenCourseLevel,
  setOpenCourseLevel,
  courseArrLength,
}) => {
  const [SingleProgram, setSingleProgram] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [programArr, setProgramArr] = useState([]);
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [volunteerArr, setVolunteerArr] = useState([]);
  const [preacher1, setPreacher1] = useState(0);
  const [mentor, setMentor] = useState(0);
  const [preacher2, setPreacher2] = useState(0);
  const [coordinator, setCoordinator] = useState(0);
  const [programId, setProgramId] = useState(0);
  const [description, setDescription] = useState("");
  const [programName, setProgramName] = useState(0);
  const [name, setName] = useState("");
  const [expectedStartDate, setExpectedStartDate] = useState("");
  const [expectedEndDate, setExpectedEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      programName,
      expectedStartDate,
      expectedEndDate,
      preacher1,
      preacher2,
      mentor,
      coordinator,
      programId,
      number: courseArrLength + 1,
    };

    const isEmpty = Object.values(formData).some(
      (value) => value === "" || value === 0
    );

    if (isEmpty) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_ENDPOINT}/level/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setOpenCourseLevel(false);
      } else {
        const errorData = await response.json();

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
    const fetchVolunteers = async () => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/volunteer/`);
        if (response.ok) {
          const data = await response.json();
          setVolunteerArr(data.content);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };
    fetchVolunteers();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/program/`);
        if (response.ok) {
          const data = await response.json();
          setProgramArr(data.content);
        } else {
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

  const handleSelectProgram = (item) => {
    setProgramId(item.id);
    setProgramName(item.name);
    setSingleProgram(item);
    setIsOpenSelection(false);
  };

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
        <div className="md:w-[50vw] w-[85vw] p-5 mb-16 md:h-[80vh] h-[95vh] overflow-y-scroll">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <p
                  className={`font-semibold ${
                    isLoading ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Program Name
                </p>
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={() =>
                      !isLoading && setIsOpenSelection(!isOpenSelection)
                    }
                    className={`inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium  bg-white border border-gray-300 rounded-md shadow-sm ${
                      isLoading
                        ? "text-gray-400"
                        : "hover:bg-gray-50 focus:outline-none focus:ring-1 text-gray-700"
                    }`}
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <p>
                      {Object.keys(SingleProgram).length === 0
                        ? "Select"
                        : `${SingleProgram?.name}`}
                    </p>
                    <p>
                      <ChevronDownIcon className="h-3 w-3 text-black" />
                    </p>
                  </button>
                  {!isLoading && isOpenSelection ? (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div className="py-1" role="none">
                        {programArr.length > 0 ? (
                          programArr.map((item) => (
                            <p
                              value={item.name}
                              key={item.id}
                              role="menu"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleSelectProgram(item)}
                            >
                              {item.name}
                            </p>
                          ))
                        ) : (
                          <p>NO program to show</p>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
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
                  className={`border border-gray-300 shadow-sm ${
                    isLoading
                      ? "outline-none"
                      : "bg-white focus:outline-gray-400"
                  } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                  readOnly={isLoading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className={`border border-gray-300 shadow-sm ${
                    isLoading
                      ? "outline-none"
                      : "bg-white focus:outline-gray-400"
                  } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                  readOnly={isLoading}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <SelectVolunteerInput
                  isLoading={isLoading}
                  volunteerArr={volunteerArr}
                  setVolunteer={setPreacher1}
                  label={"preacher1"}
                  volunteer_id={SingleProgram?.preacher}
                />
                <SelectVolunteerInput
                  isLoading={isLoading}
                  volunteerArr={volunteerArr}
                  setVolunteer={setPreacher2}
                  label={"preacher2"}
                />
                <SelectVolunteerInput
                  isLoading={isLoading}
                  volunteerArr={volunteerArr}
                  setVolunteer={setCoordinator}
                  label={"coordinator"}
                  volunteer_id={SingleProgram?.coordinator}
                />
                <SelectVolunteerInput
                  isLoading={isLoading}
                  volunteerArr={volunteerArr}
                  setVolunteer={setMentor}
                  label={"mentor"}
                  volunteer_id={SingleProgram?.mentor}
                />
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
                    className={`border border-gray-300 shadow-sm ${
                      isLoading
                        ? "outline-none"
                        : "bg-white focus:outline-gray-400"
                    } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                    readOnly={isLoading}
                    onChange={(e) => {
                      const startDate = new Date(e.target.value).toISOString();
                      setExpectedStartDate(startDate);
                    }}
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
                    className={`border border-gray-300 shadow-sm ${
                      isLoading
                        ? "outline-none"
                        : "bg-white focus:outline-gray-400"
                    } px-4 py-1.5 rounded-md transition-colors duration-500 `}
                    readOnly={isLoading}
                    onChange={(e) => {
                      const endtDate = new Date(e.target.value).toISOString();
                      setExpectedEndDate(endtDate);
                    }}
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

function SelectVolunteerInput({
  volunteerArr,
  isLoading,
  label,
  setVolunteer,
  volunteer_id,
}) {
  const [currentVolunteer, setCurrentVolunteer] = useState({});
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState({});

  useEffect(() => {
    if (volunteer_id) {
      const item = volunteerArr?.filter(
        (item) => item.id === volunteer_id && item
      );
      setCurrentVolunteer(item[0]);
      setVolunteer(item[0].id);
    }
  }, [volunteer_id, volunteerArr, setVolunteer]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p
          className={`font-semibold ${
            isLoading ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {label}
        </p>
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => !isLoading && setIsOpenSelection(!isOpenSelection)}
            className={`inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium  bg-white border border-gray-300 rounded-md shadow-sm ${
              isLoading
                ? "text-gray-400"
                : "hover:bg-gray-50 focus:outline-none focus:ring-1 text-gray-700"
            }`}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <p>
              {Object.keys(selectedVolunteer).length === 0
                ? `${
                    volunteer_id
                      ? currentVolunteer.initialName
                        ? currentVolunteer?.initialName
                        : `${currentVolunteer.firstName} ${currentVolunteer.lastName}`
                      : "Select"
                  }`
                : `${
                    selectedVolunteer?.initialName
                      ? selectedVolunteer?.initialName
                      : `${selectedVolunteer?.firstName} ${selectedVolunteer?.lastName}`
                  }`}
            </p>
            <p>
              <ChevronDownIcon className="h-3 w-3 text-black" />
            </p>
          </button>
          {!isLoading && isOpenSelection ? (
            <div
              className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                {volunteerArr?.length > 0 ? (
                  volunteerArr.map((item) => (
                    <p
                      value={item.id}
                      key={item.id}
                      role="menu"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsOpenSelection(false);
                        setVolunteer(item.id);
                        setSelectedVolunteer(item);
                      }}
                    >
                      {item?.initialName
                        ? item?.initialName
                        : `${item.firstName} ${item.lastName}`}
                    </p>
                  ))
                ) : (
                  <p>NO Volunteer to show</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
