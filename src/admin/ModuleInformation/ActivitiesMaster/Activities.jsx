import React, { useState } from "react";

import {
  ChevronRightIcon,
  CubeTransparentIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Slider from "../../../components/MdLeftHeaderSlider";
import { useLocation } from "react-router-dom";
import ActivityModal from "./ActivityModal";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";

function ActivitiesM() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [activitiesArr, setActivitiesArr] = useState([]);
  const [OpenActivityModal, setOpenActivityModal] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [createCourseLoading, setCreateCourseLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  useState(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/activity/`);
        if (response.ok) {
          const responseData = await response.json();
          setActivitiesArr(responseData.content);
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
      <Sidebar />
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
                onClick={() => setOpenActivityModal(true)}
                className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
              >
                <PlusIcon className="h-4 w-4" /> New Activity
              </button>
            </div>
            <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
              <div className="flex items-center justify-between border-b">
                <p className=" px-2 py-1 font-semibold text-gray-600">
                  Activity master
                </p>
              </div>

              <div className="overflow-x-scroll">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-6 font-semibold py-1">
                        Select
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-full">
                          Activity Name
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            fieldname={"programName"}
                            selected={doesFieldExists(queryArr, "programName")}
                            removeFilter={() =>
                              removeObjectByKey("programName")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-full py-1">
                          Activity Description
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            fieldname={"courseCode"}
                            selected={doesFieldExists(queryArr, "courseCode")}
                            removeFilter={() => removeObjectByKey("courseCode")}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activitiesArr?.map((acitivity, index) => (
                      <tr key={index} className="border-b">
                        <td className="flex justify-center py-5">
                          <input
                            type="checkbox"
                            id=""
                            value={index}
                            className=" checked:text-green-400 text-green-400"
                          />
                        </td>
                        <td className="px-10">{acitivity.name}</td>
                        <td className="px-10">{acitivity.description}</td>
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
      <ActivityModal
        isOpen={OpenActivityModal}
        onClose={() => setOpenActivityModal(false)}
      />
    </div>
  );
}

export default ActivitiesM;
