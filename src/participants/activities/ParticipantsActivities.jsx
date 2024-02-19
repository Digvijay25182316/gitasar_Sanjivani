import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../admin/config/Server";
import toast from "react-hot-toast";
import ProgramCard from "./ProgramCard";

function Activities() {
  const { programId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [activitiesArr, setActivitiesArr] = useState([]);
  const [participant, setParticipant] = useState({});
  const navigate = useNavigate();

  const storeToLocalStorage = (item) => {
    localStorage.setItem("phoneNumber", item);
  };

  const [Activities, setSelectedActivities] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");

  const clearForm = () => {
    setSelectedActivities(0);
    setPhoneNumber("");
    setDescription("");
    setStartDate("");
  };

  async function handleSubmitActivity(e) {
    e.preventDefault();
    const formData = {
      participantId: participant.id,
      activityId: Activities,
      programId: Number(programId),
      activityDate: new Date(StartDate).toISOString(),
    };

    try {
      setIsLoading(true);
      const header = new Headers();
      header.append("Content-Type", "application/json");
      const response = await fetch(
        `${SERVER_ENDPOINT}/participant-activity/register`,
        { method: "POST", body: JSON.stringify(formData), headers: header }
      );
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        clearForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitUser(e) {
    setIsLoading(true);
    e.preventDefault();
    if (phoneNumber === "") {
      toast.error("Enter your phone Number");
      return;
    }
    try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/participant/phone/${phoneNumber}`
      );

      if (response.ok) {
        const responseData = await response.json();
        setParticipant(responseData);
      } else if (response.status === 404) {
        toast.error(
          "participant with the phone number does not exists  please register"
        );
        navigate("/registeration");
        storeToLocalStorage(phoneNumber);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
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

  return (
    <div className="container mx-auto my-4 bg-white rounded-2xl border p-6 lg:w-[600px] md:w-[600px] w-[90vw]">
      <div className="flex flex-col items-center mx-5">
        <div className="flex md:flex-row flex-col items-center">
          <form onSubmit={handleSubmitUser}>
            <div className="flex md:flex-row flex-col gap-2 md:items-end items-center">
              <div className="flex flex-col gap-2 mx-5">
                <label className="font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="px-4 py-1.5 border rounded outline-none "
                  placeholder="8888959287 "
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-5 ml-2">
                <button
                  className={`px-4 py-1.5 text-lg  ${
                    isLoading
                      ? "bg-blue-400 text-white"
                      : "bg-blue-700 text-white"
                  } rounded md:w-[150px] w-[100px]`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "loading..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={`mt-5 flex flex-col items-center gap-5`}>
          {Object.keys(participant).length > 0 ? (
            <div className="flex flex-col font-semibold ">
              <i className="text-red-700">{`${participant.firstName} ${participant.lastName}`}</i>
            </div>
          ) : null}
          <div className="font-semibold text-gray-400">
            <i className="text-gray-700">
              <ProgramCard programId={Number(programId)} />
            </i>
          </div>
        </div>
        <div
          className={
            Object.keys(participant).length === 0 ? "opacity-20" : null
          }
        >
          <div className="my-4 border-t md:w-[550px] w-[80vw] px-5">
            <p className="font-semibold text-gray-700 text-lg">
              Select Service
            </p>
            <p className="text-sm text-gray-500">Select a service from list</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitActivity}>
            <div className="px-5 flex flex-col gap-2">
              <label className="font-semibold" htmlFor="activityId">
                select service
              </label>
              <select
                name="activityId"
                className="px-4 py-1.5 border rounded outline-none bg-white"
                onChange={(e) => {
                  setSelectedActivities(Number(e.target.value));
                }}
                disabled={Object.keys(participant).length === 0}
              >
                <option value=""> select</option>
                {activitiesArr?.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-5 flex flex-col gap-2">
              <label className="font-semibold">service description</label>
              <textarea
                className="px-4 py-1.5 border rounded outline-none"
                placeholder="Write some description why did you choose this"
                value={description}
                id="description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                disabled={Object.keys(participant).length === 0}
              />
            </div>
            <div className="px-5 flex flex-col gap-2">
              <label htmlFor="start_date" className="font-semibold">
                service start date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="px-4 py-1.5 border rounded outline-none"
                onChange={(e) => setStartDate(e.target.value)}
                disabled={Object.keys(participant).length === 0}
              />
            </div>
            <div className="flex items-center justify-center gap-5 px-5 bg-white mt-10">
              <button
                className="bg-blue-700 w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white"
                type="submit"
                disabled={Object.keys(participant).length === 0 || isLoading}
              >
                {isLoading ? "loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Activities;
