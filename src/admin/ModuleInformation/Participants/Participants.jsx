import {
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

function Participants() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [OpenParticipant, setOpenParticipants] = useState(false);
  const [ParicipantArr, setParticipants] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

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

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/participant/`);
        if (response.ok) {
          const responseData = await response.json();
          setParticipants(responseData.content);
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
  }, []);

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
              </div>
              <div className="overflow-x-scroll">
                {ParicipantArr?.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border-b px-6 font-semibold py-1">
                          select
                        </th>

                        <th className="border-b px-6 font-semibold py-1">
                          First Name
                        </th>

                        <th className="border-b px-6 font-semibold py-1">
                          Last Name
                        </th>

                        <th className="border-b px-6 font-semibold py-1">
                          Phone
                        </th>

                        <th className="border-b px-6 font-semibold py-1">
                          Dob
                        </th>

                        <th className="border-b px-6 font-semibold py-1">
                          Gender
                        </th>
                      </tr>
                    </thead>
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
                              <div>{item.dob}</div>
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
                  </table>
                ) : (
                  <div className="text-center text-gray-400 my-10">
                    {" "}
                    No Participants Found
                  </div>
                )}
              </div>
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
