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
} from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import Slider from "../../../components/MdLeftHeaderSlider";
import { Link, useLocation } from "react-router-dom";
import VolunteersModal from "./VolunteerModal";
import { SERVER_ENDPOINT } from "../../config/Server";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import toast from "react-hot-toast";

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
        <div className="fixed left-0 top-10 min-h-screen md:max-w-[19.7vw] w-full bg-white drop-shadow-lg py-10 flex flex-col gap-5 font-nunito-sans text-gray-500 ">
          <Link to={"/admin/information/program"}>
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
          <Link to={"/admin/information/mcourse"}>
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
          <Link to={"/admin/information/activities"}>
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
          <Link to={"/admin/information/mactivities"}>
            <div
              className={`flex items-center text-lg ${
                pathname.startsWith("/admin/information/mactivities")
                  ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                  : "text-gray-500"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <QueueListIcon className="h-6 w-6" />
              </p>
              <p>Activities Master</p>
            </div>
          </Link>
          <Link to={"/admin/information/course-level"}>
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
          <Link to={"/admin/information/volunteers"}>
            <div
              className={`flex items-center text-lg ${
                pathname.startsWith("/admin/information/volunteers")
                  ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                  : "text-gray-500"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <UserIcon className="h-6 w-6" />
              </p>
              <p>Volunteers</p>
            </div>
          </Link>
          <Link to={"/admin/information/participants"}>
            <div
              className={`flex items-center text-lg ${
                pathname.startsWith("/admin/information/participants")
                  ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                  : "text-gray-500"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <UserGroupIcon className="h-6 w-6" />
              </p>
              <p>Participants</p>
            </div>
          </Link>
        </div>
      </div>
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
                onClick={() => setOpenActivities(true)}
              >
                + New Volunteer
              </button>
            </div>
            <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow">
              <div className="flex items-center justify-between border-b">
                <p className=" px-2 py-1 font-semibold text-gray-600">
                  Volunteer
                </p>
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
                      <th className="font-normal border-r border-b">
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
                      <th className="font-normal border-r border-b">
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
                      <th className="font-normal border-r border-b">
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
                      <th className="font-normal border-r border-b">
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
                      <th className="font-normal border-r border-b">
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
                      <th className="font-normal border-r border-b">
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
                      <th className="font-normal border-r border-b">
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
                        <td className="border-l">
                          {volunteer.currentServices}
                        </td>
                        <td className="border-l">
                          {volunteer.serviceInterests}
                        </td>
                        <td className="border-l">{volunteer.firstName}</td>
                        <td className="border-l">{volunteer.lastName}</td>
                        <td className="border-l">{volunteer.initiatedName}</td>
                        <td className="border-l">{volunteer.contactNumber}</td>
                        <td className="border-l">{volunteer.dob}</td>
                        <td className="border-l border-r">
                          {volunteer.gender}
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
