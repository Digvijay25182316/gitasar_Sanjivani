import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Slider from "../../../components/MdLeftHeaderSlider";
import { useLocation } from "react-router-dom";
import VolunteersModal from "./VolunteerModal";
import { SERVER_ENDPOINT } from "../../config/Server";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import toast from "react-hot-toast";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";
import DateDisplay from "../../../components/DateDisplay";

function Volunteers() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [VolunteerData, setVolunteerData] = useState([]);
  const [OpenActivities, setOpenActivities] = useState(false);

  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(0);
  const [totalElement, setTotalElements] = useState(0);
  const [VisibleElements, setVisibleElements] = useState(10);

  let url = `${SERVER_ENDPOINT}/volunteer/`;
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
          setVolunteerData(responseData.content);
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
  }, [OpenActivities, url]);

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
    <div className="flex items-center max-w-screen bg-white">
      <div className="md:w-[20vw] md:flex hidden">
        <Sidebar />
      </div>
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
                onClick={() => setOpenActivities(true)}
                className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
              >
                <PlusIcon className="h-4 w-4" /> New Activity
              </button>
            </div>

            <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
              <div className="flex items-center justify-between border-b">
                <p className=" px-2 py-1 font-semibold text-gray-600">
                  Volunteer
                </p>
                <p className="px-2 py-1  text-gray-400">{`${
                  totalElement < 10
                    ? totalElement
                    : VisibleElements > totalElement
                    ? totalElement
                    : VisibleElements
                } of ${totalElement}`}</p>
              </div>
              <div className="overflow-x-scroll">
                <table>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-6 font-semibold py-1">
                        Select
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          First Name
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "firstName"
                            )}
                            fieldname={"firstName"}
                            selected={doesFieldExists(queryArr, "firstName")}
                            removeFilter={() => removeObjectByKey("firstName")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Last Name
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "lastName"
                            )}
                            fieldname={"lastName"}
                            selected={doesFieldExists(queryArr, "lastName")}
                            removeFilter={() => removeObjectByKey("lastName")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Initiated Name
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "initiatedName"
                            )}
                            fieldname={"initiatedName"}
                            selected={doesFieldExists(
                              queryArr,
                              "initiatedName"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("initiatedName")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Contact Number
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "contactNumber"
                            )}
                            fieldname={"contactNumber"}
                            selected={doesFieldExists(
                              queryArr,
                              "contactNumber"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("contactNumber")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          dob
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some((obj) => obj.sort === "dob")}
                            fieldname={"dob"}
                            selected={doesFieldExists(queryArr, "dob")}
                            removeFilter={() => removeObjectByKey("dob")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          gender
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "gender"
                            )}
                            fieldname={"gender"}
                            selected={doesFieldExists(queryArr, "gender")}
                            removeFilter={() => removeObjectByKey("gender")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Current Service
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "currentService"
                            )}
                            fieldname={"currentService"}
                            selected={doesFieldExists(
                              queryArr,
                              "currentService"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("currentService")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          interested Service
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "serviceInterested"
                            )}
                            fieldname={"serviceInterested"}
                            selected={doesFieldExists(
                              queryArr,
                              "serviceInterested"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("serviceInterested")
                            }
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {VolunteerData?.length > 0 ? (
                    <tbody>
                      {VolunteerData?.map((volunteer, index) => (
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

                          <td className="text-center">
                            {volunteer?.firstName ? (
                              <div>{volunteer.firstName}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {volunteer?.lastName ? (
                              <div>{volunteer.lastName}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {volunteer?.initiatedName ? (
                              <div>{volunteer.initiatedName}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {volunteer?.contactNumber ? (
                              <div>{volunteer.contactNumber}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {volunteer?.dob ? (
                              <div>
                                <DateDisplay dateString={volunteer.dob} />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {volunteer?.gender ? (
                              <div>{volunteer.gender}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {volunteer?.currentServices ? (
                              <div>{volunteer.currentServices}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {volunteer?.serviceInterests ? (
                              <div>{volunteer.serviceInterests}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td
                          colSpan={10}
                          className="text-center text-gray-400 my-10"
                        >
                          No Volunteers Found
                        </td>
                      </tr>
                    </tbody>
                  )}
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
              VisibleElements > totalElement ? "text-gray-400" : "text-gray-700"
            }`}
            onClick={increasePage}
            disabled={VisibleElements > totalElement}
          >
            Next
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <VolunteersModal
        isOpen={OpenActivities}
        setIsOpen={() => setOpenActivities(false)}
      />
    </div>
  );
}

export default Volunteers;
