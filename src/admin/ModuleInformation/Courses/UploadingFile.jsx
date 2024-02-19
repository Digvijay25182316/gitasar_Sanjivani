import React, { useState } from "react";
import Papa from "papaparse";
import {
  ArrowUpOnSquareIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import AddSessions from "./Dinamicsessions";

function UploadingFile({ isOpen, setIsOpen }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [AddSessionForm, setAddSessionForm] = useState(false);

  function generateCSV(data) {
    // Ensure data is provided and is an array
    if (!data || !Array.isArray(data) || data.length === 0) {
      return "";
    }
    // Extract headers from the first object
    const headers = Object.keys(data[0]);
    // Create CSV content
    let csv = headers.join(",") + "\n";
    data.forEach((item) => {
      const values = headers.map((header) => item[header]);
      csv += values.join(",") + "\n";
    });
    return csv;
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleFileUpload = () => {
    const errorArr = [];
    const success = [];
    Papa.parse(file, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      step: async function (row, index) {
        // Accessing Code, Description, SessionName, and SessionDescription from each row
        const header = new Headers();
        header.append("Content-Type", "application/json");
        const {
          code,
          name,
          description,
          sessionName,
          sessionDescription,
          sessionCode,
          durationInMinutes,
        } = row.data;
        try {
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
        }
      },
      error: function (error) {
        console.error("Error during parsing:", error);
      },
      complete: function () {
        errorArr.length > 0
          ? toast.error(errorArr)
          : toast.success("All done!");
      },
    });
  };

  if (isOpen)
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={setIsOpen}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl">
          <div className="flex items-center border-b mb-3 pl-5 pr-5 pt-5">
            <button
              onClick={() => setIsFormOpen(false)}
              className={`text-lg py-1.5 ${
                !isFormOpen
                  ? " border border-blue-400 text-blue-700 rounded"
                  : "bg-white text-gray-500"
              } w-full`}
            >
              upload
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className={`text-lg py-1.5 ${
                isFormOpen
                  ? " border border-blue-400 text-blue-700 rounded"
                  : "bg-white text-gray-500"
              } w-full`}
            >
              Form
            </button>
          </div>
          {!isFormOpen ? (
            <>
              <div className="md:w-[500px] w-[80vw] pl-5 pr-5 pb-5">
                <div className="flex flex-col text-gray-700 mb-5">
                  <div className="flex items-center gap-3 ">
                    <p>
                      <ArrowUpOnSquareIcon className="h-6 w-6" />
                    </p>
                    <p className="text-lg font-semibold">Upload Files</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload attachments to add courses
                  </p>
                </div>
                <div
                  className={`transition-all duration-300 ${
                    isDragging ? "bg-gray-200" : "bg-gray-100"
                  } border-2 border-dashed border-blue-400 p-5 rounded-2xl flex flex-col items-center`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <p className="text-blue-700 bg-blue-200 p-3 w-max rounded-full drop-shadow-lg">
                    <ArrowUpOnSquareIcon className="h-8 w-8 " />
                  </p>
                  {isDragging ? (
                    <p className="font-semibold my-3 text-blue-700">
                      Uploading...
                    </p>
                  ) : (
                    <p className="font-semibold my-3 text-gray-400">
                      Drag and drop a file here
                    </p>
                  )}
                  <p className="font-semibold mb-2 text-gray-400">Or</p>
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="fileInput"
                    accept=".csv" // Specify the file types allowed
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md w-[200px] text-center"
                  >
                    Select a File
                  </label>
                </div>
                {file && (
                  <div className="mt-4">
                    <p className="text-lg font-semibold mb-2 text-gray-500">
                      Selected File:
                    </p>
                    <div className="flex items-center gap-6 border px-2 py-2 rounded-xl">
                      <div className="bg-gray-50 w-max p-2 rounded-xl border border-gray-100 shadow">
                        <span className="relative text-green-400 w-max">
                          <DocumentIcon className="h-10 w-10" />
                          <p className="absolute top-2 text-white left-2 right-2">
                            csv
                          </p>
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="font-semibold text-gray-700">
                          {file.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {formatBytes(file.size)}
                        </p>
                      </div>
                      <button
                        className="ml-auto bg-red-200 text-red-500 rounded-full p-1 hover:scale-105 active:scale-90"
                        onClick={handleRemoveFile}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between px-4 pt-4 gap-5 pb-5">
                <button
                  className="w-full border border-gray-400 px-4 py-1.5 rounded-md text-gray-700 text-lg hover:bg-gray-100"
                  onClick={setIsOpen}
                >
                  cancel
                </button>
                <button
                  className={`w-full ${
                    file ? "bg-blue-700" : "bg-blue-300"
                  } px-4 py-1.5 rounded-md text-white text-lg`}
                  disabled={!file}
                  onClick={handleFileUpload}
                >
                  submit
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="md:w-[500px] w-[80vw] h-[80vh] overflow-y-scroll pl-5 pr-5">
                <div className="flex flex-col text-gray-700 mb-5">
                  <div className="flex items-center gap-3 ">
                    <p>
                      <PlusIcon className="h-6 w-6" />
                    </p>
                    <p className="text-lg font-semibold">
                      Create Course Master
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 ml-3">
                    Fill the form to add courses
                  </p>
                </div>

                <AddSessions setIsOpen={setIsOpen} generateCSV={generateCSV} />
              </div>
            </>
          )}
        </div>
      </>
    );
}

export default UploadingFile;
