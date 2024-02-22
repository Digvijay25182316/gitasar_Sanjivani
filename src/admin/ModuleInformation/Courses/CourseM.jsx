import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "../../../components/MdLeftHeaderSlider";
import UploadingFile from "./UploadingFile";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import CourseDetailsCard from "./courseDetailsCard";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";
import DownloadCSVFile from "./DownloadEmptyCSV";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";

function CourseM() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [OpenPrograms, setOpenPrograms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [SessionArr, setSessionArr] = useState([]);
  const [totalElement, setTotalElements] = useState(0);
  const [VisibleElements, setVisibleElements] = useState(10);
  let url = `${SERVER_ENDPOINT}/session/`;
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
          setSessionArr(responseData.content);
          setTotalElements(responseData.totalElements);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

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
  console.log(VisibleElements);
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
              <DownloadCSVFile />
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
                <p className="px-2 py-1  text-gray-400">{`${
                  totalElement < 10
                    ? totalElement
                    : VisibleElements > totalElement
                    ? totalElement
                    : VisibleElements
                } of ${totalElement}`}</p>
              </div>
              <div className="overflow-x-scroll ">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-6 font-semibold py-1">
                        Select
                      </th>

                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          Course Name
                          {/* <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              setIsSort={SortElements}
                              issort={queryArr.some(
                                (obj) => obj.sort === "name"
                              )}
                              fieldname={"name"}
                              selected={doesFieldExists(queryArr, "name")}
                              removeFilter={() => removeObjectByKey("name")}
                            /> */}
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          Course description
                          {/* <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              setIsSort={SortElements}
                              issort={queryArr.some(
                                (obj) => obj.sort === "description"
                              )}
                              fieldname={"description"}
                              selected={doesFieldExists(
                                queryArr,
                                "description"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("description")
                              }
                            /> */}
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          Course code
                          {/* <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              setIsSort={SortElements}
                              issort={queryArr.some(
                                (obj) => obj.sort === "code"
                              )}
                              fieldname={"code"}
                              selected={doesFieldExists(queryArr, "code")}
                              removeFilter={() => removeObjectByKey("code")}
                            /> */}
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          session code
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some((obj) => obj.sort === "code")}
                            fieldname={"code"}
                            selected={doesFieldExists(queryArr, "code")}
                            removeFilter={() => removeObjectByKey("code")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          session Name
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some((obj) => obj.sort === "name")}
                            fieldname={"name"}
                            selected={doesFieldExists(queryArr, "name")}
                            removeFilter={() => removeObjectByKey("name")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          session description
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "description"
                            )}
                            fieldname={"description"}
                            selected={doesFieldExists(queryArr, "description")}
                            removeFilter={() =>
                              removeObjectByKey("description")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center py-1 w-max">
                          session duration(min)
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "durationInMinutes"
                            )}
                            fieldname={"durationInMinutes"}
                            selected={doesFieldExists(
                              queryArr,
                              "durationInMinutes"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("durationInMinutes")
                            }
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {SessionArr?.length > 0 ? (
                    <tbody>
                      {SessionArr?.map((session, index) => (
                        <tr key={index + 1} className="border-b w-full">
                          <td className="flex justify-center py-5">
                            <input
                              type="checkbox"
                              value={session.id}
                              className=" checked:text-green-400 text-green-400 cursor-pointer"
                              onChange={onChangeSelect}
                              disabled={selected}
                              checked={selectedItem === session.id}
                            />
                          </td>
                          <td className="px-10">
                            <div className=" line-clamp-2 w-max">
                              <CourseDetailsCard
                                courseCode={session.courseCode}
                                fieldName={"name"}
                              />
                            </div>
                          </td>
                          <td className="px-10">
                            <Elementexpandable>
                              <CourseDetailsCard
                                courseCode={session.courseCode}
                                fieldName={"description"}
                              />
                            </Elementexpandable>
                          </td>
                          <td className="px-10">
                            <Elementexpandable>
                              <CourseDetailsCard
                                courseCode={session.courseCode}
                                fieldName={"code"}
                              />
                            </Elementexpandable>
                          </td>
                          <td className="px-10">
                            <Elementexpandable>
                              {session?.code}
                            </Elementexpandable>
                          </td>
                          <td className="px-10">
                            <Elementexpandable>
                              {session?.name}
                            </Elementexpandable>
                          </td>
                          <td className="px-10">
                            <Elementexpandable>
                              {session?.description}
                            </Elementexpandable>
                          </td>
                          <td className="px-10">
                            <Elementexpandable>
                              {session?.durationInMinutes}
                            </Elementexpandable>
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

const Elementexpandable = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }
  }, [isExpanded]);
  return (
    <div
      className={`${isExpanded ? "w-max" : "w-full line-clamp-1"}`}
      onClick={() => setIsExpanded(true)}
    >
      {children}
    </div>
  );
};
