import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { SERVER_ENDPOINT } from "../../config/Server";

function VolunteersModal({ isOpen, setIsOpen }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    initiatedName: "",
    waNumber: "",
    contactNumber: "",
    email: "",
    dob: "", // Make sure to use the correct data type for date input
    gender: "MALE",
    address: "",
    serviceInterests: "",
    currentServices: "",
  });

  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }
  function prevStep() {
    setCurrentStep((prev) => prev - 1);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  async function onSubmit(e) {
    e.preventDefault();
    const header = new Headers();
    if (formData?.dob !== "") {
      const date = new Date(formData.dob).toISOString();
      formData.dob = date;
    }
    setIsLoading(true);
    header.append("Content-Type", "application/json");
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/volunteer/create`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setIsOpen();
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
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={setIsOpen}
        ></div>
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl ${
            isLoading && "text-gray-300"
          }`}
        >
          <div>
            <button
              className="bg-red-100 text-red-700 w-max p-2 rounded-full h-max absolute right-2 top-2 z-[100]"
              onClick={setIsOpen}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className={`p-2 px-5 py-1.5 ${isLoading && "opacity-60"}`}>
            <p className="text-lg font-semibold text-gray-600">Add Volunteer</p>
            <p className="text-sm text-gray-500">
              By filling the form you'll create volunteer
            </p>
          </div>
          <div className="flex items-center justify-around gap-10 px-10 py-6">
            <div
              className={`w-full transition-colors duration-300 cursor-pointer ${
                currentStep === 1 ? "bg-blue-700" : "bg-blue-200"
              } h-2 rounded-full`}
              onClick={() => setCurrentStep(1)}
            ></div>
            <div
              className={`w-full transition-colors duration-300 cursor-pointer ${
                currentStep === 2 ? "bg-blue-700" : "bg-blue-200"
              } h-2 rounded-full`}
              onClick={() => setCurrentStep(2)}
            ></div>
          </div>
          <div className="md:w-[50vw] w-[85vw] mb-16">
            <form className="overflow-y-scroll px-5" onSubmit={onSubmit}>
              {currentStep === 1 ? (
                <>
                  <Step1
                    isLoading={isLoading}
                    StepState={formData}
                    handleChange={handleChange}
                    setIsOpen={setIsOpen}
                    nextStep={nextStep}
                  />
                </>
              ) : (
                <>
                  <Step2
                    isLoading={isLoading}
                    StepState={formData}
                    handleChange={handleChange}
                    prevStep={prevStep}
                  />
                </>
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default VolunteersModal;

function Step1({ StepState, handleChange, isLoading, setIsOpen, nextStep }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex md:flex-row flex-col md:items-center gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label>First Name</label>
          <input
            type="text"
            className={`px-4 py-1.5 border rounded-md outline-none ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            value={StepState.firstName}
            onChange={handleChange}
            placeholder="John"
            name="firstName"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Last name</label>
          <input
            type="text"
            className={`px-4 py-1.5 border rounded-md outline-none ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            value={StepState.lastName}
            onChange={handleChange}
            placeholder="Doe"
            name="lastName"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>Initiated Name</label>
        <input
          type="text"
          className={`px-4 py-1.5 border rounded-md outline-none ${
            !isLoading && "focus:border-blue-500"
          }`}
          readOnly={isLoading}
          value={StepState.initiatedName}
          onChange={handleChange}
          placeholder="Krushnakant Das"
          name="initiatedName"
        />
      </div>
      <div className="flex md:flex-row flex-col items-center gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label>WhatsApp Number</label>
          <input
            type="tel"
            className={`px-4 py-1.5 border rounded-md outline-none ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            value={StepState.waNumber}
            onChange={handleChange}
            placeholder="8899225566"
            name="waNumber"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Contact Number</label>
          <input
            type="tel"
            className={`px-4 py-1.5 border rounded-md outline-none ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            value={StepState.contactNumber}
            onChange={handleChange}
            placeholder="8899225566"
            name="contactNumber"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>email</label>
        <input
          type="email"
          className={`px-4 py-1.5 border rounded-md outline-none ${
            !isLoading && "focus:border-blue-500"
          }`}
          readOnly={isLoading}
          value={StepState.email}
          onChange={handleChange}
          placeholder="xyz@example.com"
          name="email"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white rounded-b-2xl">
        <button
          className="w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border"
          type="button"
          onClick={setIsOpen}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className={`w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border bg-gray-400`}
          type="button"
          onClick={nextStep}
          disabled={isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
function Step2({ StepState, handleChange, isLoading, prevStep }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex md:flex-row flex-col items-center gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label>Date Of Birth</label>
          <input
            type="date"
            className={`px-4 py-1.5 border rounded-md outline-none cursor-pointer ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            value={StepState.dob}
            onChange={handleChange}
            name="dob"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>gender</label>
          <select
            type="text"
            className={`px-4 py-1.5 border rounded-md outline-none ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            onChange={handleChange}
            name="gender"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>Address</label>
        <input
          type="text"
          className={`px-4 py-1.5 border rounded-md outline-none ${
            !isLoading && "focus:border-blue-500"
          }`}
          readOnly={isLoading}
          value={StepState.address}
          onChange={handleChange}
          placeholder="Pune-46"
          name="address"
        />
      </div>
      <div className="flex md:flex-row flex-col items-center gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label>Service Interested</label>
          <input
            className={`px-4 py-1.5 border rounded-md outline-none ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            value={StepState.serviceInterests}
            onChange={handleChange}
            name="serviceInterests"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Current Service</label>
          <input
            className={`px-4 py-1.5 border rounded-md outline-none ${
              !isLoading && "focus:border-blue-500"
            }`}
            readOnly={isLoading}
            value={StepState.currentServices}
            onChange={handleChange}
            name="currentServices"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white rounded-b-2xl">
          <button
            className={`w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border`}
            type="button"
            onClick={prevStep}
            disabled={isLoading}
          >
            Prev
          </button>

          <button
            className={`${
              isLoading ? "bg-blue-400 " : "bg-blue-700"
            } w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white flex justify-center`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-300 animate-spin fill-blue-600 my-0.5"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
