import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CourseModal from "./CourseModal";

import SessionList from "./SessionList";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import VolunteerDataCard from "./VolunteerDataCard";
import ScheduleSessions from "./ScheduleSessions";

function ViewPageController({ currentPage, setPage, selected, id }) {
  const [courseData, setCourseData] = useState({});
  const [ViewOpen, setViewOpen] = useState(false);
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const [AddSession, setAddSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/level/id/${id}`);
        if (response.ok) {
          const responseData = await response.json();
          setCourseData(responseData);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const remainingPages = 10;
  const totalEntries = 500;
  return (
    <div className="px-1">
      {selected ? (
        <div className="flex items-center gap-3 px-1">
          <button
            className="text-blue-700 flex items-center bg-blue-200 px-1 rounded"
            onClick={() => setViewOpen(true)}
          >
            <PlusIcon className="h-5 w-5" />
            Sessions
          </button>
          <button
            className="text-blue-700 flex items-center bg-blue-200 px-1 rounded"
            onClick={() => setUpdateOpen(true)}
          >
            <PencilSquareIcon className="h-5 w-5" />
            update
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gray-400">
            <p>{currentPage + "-" + remainingPages}</p> of
            <p>{totalEntries}</p>
          </div>
          <div className="flex items-center">
            <button className="flex items-center transition-colors duration-500 hover:bg-gray-100 p-1 rounded-full cursor-pointer">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="flex items-center transition-colors duration-500 hover:bg-gray-100 p-1 rounded-full cursor-pointer">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <CourseModal isOpen={ViewOpen} setIsOpen={() => setViewOpen(false)}>
        {!AddSession ? (
          <div className="w-screen h-screen flex justify-center  ">
            {!isLoading ? (
              <div className="flex flex-col gap-10 m-2 p-3 w-full overflow-y-scroll">
                <div className="flex md:flex-row flex-col  items-start md:gap-10 gap-6 ">
                  <p className="text-blue-600 bg-blue-200 w-max p-2 rounded-xl border border-blue-400 shadow">
                    <AcademicCapIcon className="h-20 w-20" />
                  </p>
                  <div className="flex flex-col md:min-h-[200px] w-full gap-5">
                    <div className="flex items-center gap-4">
                      <p className="text-gray-800 text-xl">Course Details :</p>
                      {courseData.status === "ACTIVE" ? (
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          <p>Active</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                          <p>InActive</p>
                        </div>
                      )}
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 ">
                      <div className="md:border-l px-3">
                        <p className="text-gray-500 font-semibold w-full ">
                          Program Name :
                        </p>
                        <p className="text-black font-semibold flex justify-start">
                          {courseData.programName}
                        </p>
                      </div>
                      <div className="md:border-l px-3">
                        <p className="text-gray-500 font-semibold w-full">
                          Course Name :
                        </p>
                        <p className="text-black font-semibold ">
                          {courseData.name}
                        </p>
                      </div>

                      <div className="md:border-l px-3">
                        <p className="text-gray-500 font-semibold w-full">
                          preacher :
                        </p>
                        <div className="text-black font-semibold">
                          <VolunteerDataCard
                            volunteer_id={courseData.preacher1}
                          />
                        </div>
                      </div>
                      <div className="md:border-l px-3">
                        <p className="text-gray-500 font-semibold w-full">
                          mentor :
                        </p>
                        <div className="text-black font-semibold">
                          <VolunteerDataCard volunteer_id={courseData.mentor} />
                        </div>
                      </div>
                      <div className="md:border-l px-3">
                        <p className="text-gray-500 font-semibold w-full">
                          coordinator :
                        </p>
                        <div className="text-black font-semibold">
                          <VolunteerDataCard
                            volunteer_id={courseData.coordinator}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow border">
                    <div className="flex">
                      <p className=" px-2 py-1 font-semibold text-gray-600">
                        Sessions
                      </p>
                      <button
                        className="ml-auto px-4 py-1 bg-blue-600 mt-2 mr-2 rounded-md text-white font-semibold"
                        onClick={() => setAddSession(true)}
                      >
                        + Session
                      </button>
                    </div>

                    <SessionList course_level_id={courseData.id} />
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

            <button
              className="bg-red-100 text-red-700 w-max p-2 rounded-full h-max absolute right-2 top-2 z-[100]"
              onClick={() => setViewOpen(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <>
            <ScheduleSessions
              courseName={courseData.name}
              onCancel={() => setAddSession(false)}
              onClose={() => {
                setAddSession(false);
              }}
              courseData={courseData}
            />
          </>
        )}
      </CourseModal>
      <CourseModal isOpen={UpdateOpen} setIsOpen={() => setUpdateOpen(false)}>
        <div className="w-[85vw] md:w-[80vw] h-[85vh] md:h-[90vh]">
          <div>
            <button
              className="bg-red-100 text-red-700 w-max p-2 rounded-full"
              onClick={() => setUpdateOpen(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CourseModal>
    </div>
  );
}

export default ViewPageController;
