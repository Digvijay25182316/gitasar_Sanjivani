import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";
import { useLocation } from "react-router-dom";
import ParticipantModal from "./ParticipantModal";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import Slider from "../../../components/MdLeftHeaderSlider";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import DateDisplay from "../../../components/DateDisplay";

function Participants() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [OpenParticipant, setOpenParticipants] = useState(false);
  const [ParicipantArr, setParticipants] = useState([]);
  const [selected, setSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [totalElement, setTotalElements] = useState(0);
  const [VisibleElements, setVisibleElements] = useState(10);

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

  let url = `${SERVER_ENDPOINT}/participant/`;
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
      setLoading(true);
      try {
        const response = await fetch(url);
        if (response.ok) {
          const responseData = await response.json();
          setParticipants(responseData.content);
          setTotalElements(responseData.totalElements);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

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
      <Sidebar />
      {!isLoading ? (
        <div className="md:w-[79.5vw] bg-gray-50 min-h-screen w-screen">
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
                className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
                onClick={() => setOpenParticipants(true)}
              >
                <PlusIcon className="h-5 w-5" /> New Participant
              </button>
            </div>
            <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
              <div className="flex items-center justify-between border-b">
                <p className=" px-2 py-1 font-semibold text-gray-600">
                  Participants
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
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className="w-max">select</div>
                      </th>

                      <th className="border-b px-6 font-semibold py-1">
                        <div className="w-max">
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
                        <div className="w-max">
                          Last Name{" "}
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
                        <div className="w-max">
                          Phone{" "}
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
                        <div className="w-max">
                          Dob{" "}
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
                        <div className="w-max">
                          Gender{" "}
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
                    </tr>
                  </thead>
                  {ParicipantArr?.length > 0 ? (
                    <tbody>
                      {ParicipantArr?.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="flex justify-center py-5">
                            <input
                              type="checkbox"
                              id=""
                              value={index}
                              className=" checked:text-green-400 text-green-400"
                            />
                          </td>
                          <td className="text-center">
                            {item?.firstName ? (
                              <div>{item.firstName}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {item?.lastName ? (
                              <div>{item.lastName}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {item?.contactNumber ? (
                              <div>{item.contactNumber}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>

                          <td className="text-center">
                            {item?.dob ? (
                              <div>
                                <DateDisplay dateString={item.dob} />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {item?.gender ? (
                              <div>{item.gender}</div>
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
                        <td className="text-center text-gray-400 py-10">
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
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center w-full">
          <div className="animate-spin">
            <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
          </div>
        </div>
      )}
      <ParticipantModal
        isOpen={OpenParticipant}
        setIsOpen={() => setOpenParticipants(false)}
      />
    </div>
  );
}

export default Participants;
