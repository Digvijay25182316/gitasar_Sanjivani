import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";

import ProgramModal from "./ProgramModal";
import Slider from "../../../components/MdLeftHeaderSlider";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import ExternalLink from "./ExternalLink";
import VolunteerDataCard from "./VolunteerDataCard";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";
import FormModalComp from "../../../components/ModalForm/FormModalComp";

function Programs() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [programArr, setProgramArr] = useState([]);
  const [OpenPrograms, setOpenPrograms] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [totalElement, setTotalElements] = useState(0);
  const [VisibleElements, setVisibleElements] = useState(10);

  let url = `${SERVER_ENDPOINT}/program/`;
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

          setProgramArr(responseData.content);
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
  }, [OpenPrograms, url]);
  useEffect(() => {
    if (OpenPrograms) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [OpenPrograms]);

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
    <div className="flex items-center max-w-screen bg-gray-50">
      <div className="md:w-[20vw] md:flex hidden">
        <Sidebar />
      </div>
      <div className="md:w-[79.5vw] min-h-screen w-screen">
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
                onClick={() => setOpenPrograms(true)}
                className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
              >
                <PlusIcon className="h-4 w-4" /> New Program
              </button>
            </div>
            <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
              <div className="flex items-center justify-between border-b">
                <p className=" px-2 py-1 font-semibold text-gray-600">
                  Programs
                </p>
                <p className="px-2 py-1  text-gray-400">{`${
                  totalElement < 10
                    ? totalElement
                    : VisibleElements > totalElement
                    ? totalElement
                    : VisibleElements
                } of ${totalElement}`}</p>
              </div>
              <div className="overflow-x-scroll min-h-screen">
                <table>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-10 font-semibold py-1">
                        Select
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Program Name
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
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Preacher
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "preacher"
                            )}
                            fieldname={"preacher"}
                            selected={doesFieldExists(queryArr, "preacher")}
                            removeFilter={() => removeObjectByKey("preacher")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          coordinator
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "coordinator"
                            )}
                            fieldname={"coordinator"}
                            selected={doesFieldExists(queryArr, "coordinator")}
                            removeFilter={() =>
                              removeObjectByKey("coordinator")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          mentor
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "mentor"
                            )}
                            fieldname={"mentor"}
                            selected={doesFieldExists(queryArr, "mentor")}
                            removeFilter={() => removeObjectByKey("mentor")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          incharge
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "incharge"
                            )}
                            fieldname={"incharge"}
                            selected={doesFieldExists(queryArr, "incharge")}
                            removeFilter={() => removeObjectByKey("incharge")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Type
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some((obj) => obj.sort === "type")}
                            fieldname={"type"}
                            selected={doesFieldExists(queryArr, "type")}
                            removeFilter={() => removeObjectByKey("type")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Audience Type
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "audienceType"
                            )}
                            fieldname={"audienceType"}
                            selected={doesFieldExists(queryArr, "audienceType")}
                            removeFilter={() =>
                              removeObjectByKey("audienceType")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Location
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "location"
                            )}
                            fieldname={"location"}
                            selected={doesFieldExists(queryArr, "location")}
                            removeFilter={() => removeObjectByKey("location")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1 px-5">
                          Activities Links
                        </div>
                      </th>
                      <th className="border-b px-10 font-semibold py-1">
                        <div className=" flex items-center w-max py-1 px-5">
                          Sadhana Links
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {programArr?.length > 0 ? (
                    <tbody>
                      {programArr?.map((Programs, index) => (
                        <tr key={index + 1} className="border-b ">
                          <td className="flex justify-center py-5">
                            <input
                              type="checkbox"
                              value={index + 1}
                              className=" checked:text-green-400 text-green-400 cursor-pointer"
                              onChange={onChangeSelect}
                              disabled={selected}
                              checked={selectedItem === Programs.id}
                            />
                          </td>
                          <td className="text-center">{Programs.name}</td>
                          <td className="text-center">
                            {Programs?.preacher ? (
                              <div>
                                <VolunteerDataCard
                                  volunteer_id={Programs.preacher}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Programs?.coordinator ? (
                              <div>
                                <VolunteerDataCard
                                  volunteer_id={Programs.coordinator}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Programs?.incharge ? (
                              <div>
                                <VolunteerDataCard
                                  volunteer_id={Programs.incharge}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Programs?.mentor ? (
                              <div>
                                <VolunteerDataCard
                                  volunteer_id={Programs.mentor}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">{Programs.type}</td>
                          <td className="text-center">
                            {Programs.audienceType}
                          </td>
                          <td className="text-center">{Programs.location}</td>

                          <td className="flex items-center gap-5 justify-center">
                            <ExternalLink Programs={Programs} />
                          </td>
                          <td>
                            <FormModalComp program={Programs} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td
                          className="text-center text-gray-400 py-10"
                          colSpan={10}
                        >
                          {" "}
                          No Participants Found
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
      <ProgramModal
        isOpen={OpenPrograms}
        onClose={() => setOpenPrograms(false)}
      />
    </div>
  );
}

export default Programs;
