import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const AddSessions = ({ setIsOpen }) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  function convertToCSV(objArray) {
    if (!Array.isArray(objArray) || objArray.length === 0) {
      return ""; // return empty string if objArray is not an array or has no elements
    }

    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    // Header
    str +=
      Object.keys(array[0])
        .map((key) => `"${key}"`)
        .join(",") + "\r\n";

    // Rows
    for (let i = 0; i < array.length; i++) {
      const line = Object.values(array[i])
        .map((value) => `"${value}"`)
        .join(",");
      str += line + "\r\n";
    }

    console.log(str);
    return str;
  }

  const [sessions, setSessions] = useState([]);

  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][field] = value;
    setSessions(updatedSessions);
  };

  const handleAddSession = () => {
    setSessions([
      ...sessions,
      {
        courseCode,
        sessionCode: "",
        sessionName: "",
        sessionDescription: "",
        durationInMinutes: "",
      },
    ]);
  };

  const handleRemoveSession = (index) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    /**try {
          if (
            code ||
            name ||
            description ||
            sessionCode ||
            sessionDescription ||
            sessionName ||
            durationInMinutes
          ) {
            const courseData = { code, name, description };
            const responseCourse = await fetch(
              `${SERVER_ENDPOINT}/course/create`,
              {
                method: "POST",
                headers: header,
                body: JSON.stringify(courseData),
              }
            );
            if (responseCourse.ok) {
              const sessionData = {
                code: sessionCode,
                name: sessionName,
                description: sessionDescription,
                durationInMinutes,
                courseCode: code,
              };
              const responseSession = await fetch(
                `${SERVER_ENDPOINT}/session/create`,
                {
                  method: "POST",
                  headers: header,
                  body: JSON.stringify(sessionData),
                }
              );
              if (responseSession.ok) {
                console.log("done...?????///!!!!");
              } else {
                const errorData = await responseSession.json();
                console.log(errorData);
              }
            } else {
              if (responseCourse.status === 409) {
                const sessionData = {
                  code: sessionCode,
                  name: sessionName,
                  description: sessionDescription,
                  durationInMinutes,
                  courseCode: code,
                };
                const responseSession = await fetch(
                  `${SERVER_ENDPOINT}/session/create`,
                  {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(sessionData),
                  }
                );
                if (responseSession.ok) {
                  success.push("sessionSuccessfully uploaded :", {
                    sessionCode,
                    sessionName,
                    sessionDescription,
                  });
                } else {
                  const errorData = await responseSession.json();
                  errorArr.push(
                    `error occured while uploading the session ${errorData}`,
                    { sessionName, sessionCode, sessionDescription }
                  );
                }
              } else {
                const errorData = await responseCourse.json();
                errorArr.push(
                  `errorOccured while uploading the course ${`name: ${name}`},${`description :${description}`} , ${`description :${code}`} :`,
                  errorData
                );
              }
            }
          } else {
            errorArr.push(
              `row ${index} data could not be uploaded due to insufficient fields`
            );
          }
        } catch (error) {
          errorArr.push(`an exception occured : ${error.message}`);
        } */
    sessions.map(async (item) =>
      convertToCSV({
        code: courseCode,
        name: courseCode,
        description: courseDescription,
        sessionName: item.sessionName,
        sessionDescription: item.sessionDescription,
        sessionCode: item.sessionCode,
        durationInMinutes: item.durationInMinutes,
      })
    );
  };

  return (
    <>
      <div>
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Course Code</label>
            <input
              type="text"
              className="px-4 py-1.5 border rounded-md outline-none focus:border-blue-700"
              placeholder="enter course name"
              onChange={(e) => setCourseCode(e.target.value)}
              value={courseCode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Course Name</label>
            <input
              type="text"
              className="px-4 py-1.5 border rounded-md outline-none focus:border-blue-700"
              placeholder="enter course name"
              onChange={(e) => setCourseName(e.target.value)}
              value={courseName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Course Description</label>
            <input
              type="text"
              className="px-4 py-1.5 border rounded-md outline-none focus:border-blue-700"
              placeholder="enter course name"
              onChange={(e) => setCourseDescription(e.target.value)}
              value={courseDescription}
            />
          </div>

          <div className="md:h-[30vh] h-[50vh] overflow-y-scroll mb-20">
            {sessions.map((session, index) => (
              <div className="relative" key={index}>
                <div key={index} className=" border-2 border-dashed p-2 my-5">
                  <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={() => handleRemoveSession(index)}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  <div className="w-full">
                    <label htmlFor={`sessionCode${index}`}>sessionCode</label>
                    <input
                      type="text"
                      className="w-full border rounded py-1 mb-3 px-2 text-lg"
                      placeholder="DXTYS"
                      name={`sessionCode${index}`}
                      value={session.sessionCode}
                      onChange={(e) =>
                        handleSessionChange(
                          index,
                          "sessionCode",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor={`sessionName${index}`}>session name</label>
                    <input
                      type="text"
                      className="w-full border rounded py-1 mb-3 px-2 text-lg"
                      placeholder="session name"
                      name={`sessionName${index}`}
                      value={session.sessionName}
                      onChange={(e) =>
                        handleSessionChange(
                          index,
                          "sessionName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor={`sessionDescription${index}`}>
                      session description
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded py-1 mb-3 px-2 text-lg"
                      placeholder="session description"
                      name={`sessionDescription${index}`}
                      value={session.sessionDescription}
                      onChange={(e) =>
                        handleSessionChange(
                          index,
                          "sessionDescription",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor={`durationInMinutes${index}`}>
                      durationInMinutes
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded py-1 mb-3 px-2 text-lg"
                      placeholder="25"
                      name={`durationInMinutes${index}`}
                      value={session.durationInMinutes}
                      onChange={(e) =>
                        handleSessionChange(
                          index,
                          "durationInMinutes",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="flex items-center w-full justify-between pl-5  border-2 border-dashed border-gray-300 text-center"
              type="button"
              onClick={handleAddSession}
            >
              <p className="flex-1 text-gray-400">Add sessions</p>
              <p className="bg-gray-200 p-3">
                <PlusIcon className="h-5 w-5 text-gray-500" />
              </p>
            </button>
          </div>
          <div className="flex items-center justify-between px-4 pt-4 gap-5 absolute bottom-0 left-0 right-0 pb-4 bg-white">
            <button
              className={`w-full border px-4 py-1.5 rounded-md text-black text-lg border-gray-400 cursor-pointer hover:bg-gray-100`}
              onClick={setIsOpen}
            >
              cancel
            </button>
            <button
              className={`w-full  bg-blue-700
                         px-4 py-1.5 rounded-md text-white text-lg`}
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSessions;
