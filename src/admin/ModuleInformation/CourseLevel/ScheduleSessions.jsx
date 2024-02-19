import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";

function ScheduleSessions({ courseData, onCancel, onClose }) {
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [coursesArr, setCoursesArr] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [scheduledDate, setScheduleDate] = useState("");
  const [description, setDescription] = useState("");
  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/course/`);
        if (response?.ok) {
          const responseData = await response.json();
          setCoursesArr(responseData.content);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  const handleChangeSession = async (e) => {
    try {
      setLoadingSessions(true);
      const response = await fetch(`${SERVER_ENDPOINT}/session/course/${e}`);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSessionsData(responseData.content);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingSessions(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      startTime: scheduledDate ? new Date(scheduledDate).toISOString() : "",
      sessionId: selectedSessions,
      name: sessionName,
      levelId: courseData?.id,
      programId: courseData?.programId,
    };
    if (
      formData.startTime === "" ||
      formData.sessionId === 0 ||
      formData.levelId === 0 ||
      formData.name === "" ||
      formData.programId === 0
    ) {
      toast.error("complete all the fields");
      return;
    }

    try {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      const response = await fetch(`${SERVER_ENDPOINT}/session/schedule`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="w-[85vw] md:w-[40vw] h-[85vh] md:h-screen flex justify-between">
      <div className="w-full ">
        <div className="border-b">
          <p className="text-lg font-semibold text-gray-600 px-5">
            Schedule Session
          </p>
          <p className="text-sm font-semibold  text-gray-500 px-5">
            course : {courseData?.name}
          </p>
        </div>
        <div className="pt-5 overflow-y-scroll h-screen">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 px-5">
                <label
                  className="font-semibold text-gray-600"
                  htmlFor="startTime"
                >
                  Planned Session Date
                </label>
                <input
                  type="date"
                  className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                  name="startTime"
                  onChange={(e) => {
                    setScheduleDate(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-5 px-5">
                <SelectCourse
                  isLoading={loadingSessions}
                  TypeArr={coursesArr}
                  setType={handleChangeSession}
                  label={"select course"}
                />
                {loadingSessions ? (
                  <>...loading</>
                ) : (
                  <SelectCourse
                    isLoading={loadingSessions}
                    TypeArr={sessionsData}
                    setType={setSelectedSessions}
                    label={"select session"}
                  />
                )}
                {/* <div className="flex flex-col gap-2 px-5">
                  <label
                    className="font-semibold text-gray-600"
                    htmlFor="levelId"
                  >
                    Select Course
                  </label>

                  <select
                    className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    name="levelId"
                    onChange={handleChangeSession}
                    id="levelId"
                  >
                    <option value={""}>select</option>
                    {coursesArr?.map((item) => (
                      <option key={item.id} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* <div className="flex flex-col gap-2 px-5" htmlFor="sessionId">
                  <label className="font-semibold text-gray-600">
                    Select Session
                  </label>
                  {loadingSessions ? (
                    <>loading...</>
                  ) : (
                    <select
                      type="sessionId"
                      className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400 "
                      onChange={(e) => setSelectedSessions(e.target.value)}
                    >
                      <option value={""}>select</option>
                      {sessionsData?.map((session) => (
                        <option key={session.id} value={session.id}>
                          {session.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div> */}
              </div>

              <div className="flex flex-col gap-2 px-5">
                <label className="text-gray-600 font-semibold" htmlFor="name">
                  Session Name
                </label>
                <input
                  type="text"
                  placeholder="Name this session"
                  className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                  name="name"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 px-5">
                <label className="text-gray-600 font-semibold" htmlFor="name">
                  Session Description
                </label>
                <textarea
                  placeholder="Enter The description"
                  className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white">
              <button
                className="w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-700 w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        className="bg-red-100 text-red-700 w-max p-2 rounded-full h-max absolute right-2 top-2 z-[100]"
        onClick={onClose}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ScheduleSessions;

const SelectCourse = ({ isLoading, label, TypeArr, setType }) => {
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [selectedType, setSelectedType] = useState({});
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
              {Object.keys(selectedType).length === 0
                ? "Select"
                : `${selectedType?.name}`}
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
                {TypeArr?.length > 0 ? (
                  TypeArr.map((item, index) => (
                    <p
                      value={item.code}
                      key={index}
                      role="menu"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedType(item);
                        setIsOpenSelection(false);
                        setType(item.code);
                      }}
                    >
                      {item?.name}
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
};
const SelectSession = ({ isLoading, label, TypeArr, setType }) => {
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [selectedType, setSelectedType] = useState({});
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
              {Object.keys(selectedType).length === 0
                ? "Select"
                : `${selectedType?.name}`}
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
                {TypeArr?.length > 0 ? (
                  TypeArr.map((item, index) => (
                    <p
                      value={item.id}
                      key={index}
                      role="menu"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedType(item);
                        setIsOpenSelection(false);
                        setType(item.id);
                      }}
                    >
                      {item?.name}
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
};
