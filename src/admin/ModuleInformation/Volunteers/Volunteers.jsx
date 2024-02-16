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
import React, { useCallback, useEffect, useState } from "react";
import Slider from "../../../components/MdLeftHeaderSlider";
import { Link, useLocation } from "react-router-dom";
import VolunteersModal from "./VolunteerModal";
import { SERVER_ENDPOINT } from "../../config/Server";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import toast from "react-hot-toast";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";

function Volunteers() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [VolunteerData, setVolunteerData] = useState([]);
  const [OpenActivities, setOpenActivities] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/volunteer/`);
        if (response.ok) {
          const responseData = await response.json();
          setVolunteerData(responseData.content);
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
                            origin={"origin-top-right"}
                            position={"right-0"}
                            setvalue={AddFilter}
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
                            <div>{volunteer.dob}</div>
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
      <VolunteersModal
        isOpen={OpenActivities}
        setIsOpen={() => setOpenActivities(false)}
      />
    </div>
  );
}

export default Volunteers;
