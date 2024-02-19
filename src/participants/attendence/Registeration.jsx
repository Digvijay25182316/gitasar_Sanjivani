import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../admin/config/Server";
import toast from "react-hot-toast";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const ParticipantRegisteration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    waNumber: "",
    dob: "",
    gender: "MALE",
    contactNumber: "",
    email: "",
    address: "",
    city: "",
    maritalStatus: "Non Married",
    education: "",
    occupation: "",
    reference: "",
    notes: "",
    numberOfChildren: 0,
    interestedTopics: [],
  });

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setFormState((prev) => ({
        ...prev, // Spread the previous state
        contactNumber: phoneNumber, // Update the contactNumber field
        waNumber: phoneNumber, // Update the waNumber field
      }));
    }
  }, []);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [topicNames, setTopicNames] = useState([]);

  const validateStep = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "waNumber",
      "dob",
      "contactNumber",
      "gender",
    ];
    const stepErrors = {};

    requiredFields.forEach((field) => {
      if (!formState[field]) {
        stepErrors[field] = "This field is required";
      }
    });

    setErrors(stepErrors);

    return Object.keys(stepErrors).length === 0; // Return true if no errors
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const isValidEmail = (email) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (name, value) => {
    if (name === "contactNumber" && value.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Contact number must be 10 digits",
      }));
    } else if (name === "waNumber" && value.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "whatsapp number must be 10 digits",
      }));
    } else if (name === "email" && isValidEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "whatsapp number must be 10 digits",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmitEmergency = async (e) => {
    e.preventDefault();
    validateStep();
    const formData = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      dob: formState.dob,
      waNumber: formState.waNumber,
      contactNumber: formState.contactNumber,
      gender: formState.gender,
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_ENDPOINT}/participant/create`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        navigate(-1);
      } else {
        if (response.status === 409) {
          toast.error("already esists");
          navigate(-1);
        }
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateStep();
    const formData = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      waNumber: formState.waNumber,
      contactNumber: formState.contactNumber,
      gender: formState.gender,
      education: formState.education,
      email: formState.email,
      city: formState.city,
      address: formState.address,
      maritalStatus: formState.maritalStatus,
      notes: formState.notes,
      numberOfChildren: formState.numberOfChildren,
      occupation: formState.occupation,
      reference: formState.reference,
      dob: formState.dob,
    };

    try {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      const response = await fetch(`${SERVER_ENDPOINT}/participant/create`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        navigate(-1);
      } else {
        if (response.status === 409) {
          navigate(-1);
          toast.error("user already exists");
        }
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col md:items-center justify-center text-gray-800 py-5">
      <h1 className="text-center text-blue-700 text-3xl font-bold pb-10">
        Participant Registeration
      </h1>
      <div className="md:min-w-3xl mx-2 bg-white p-5 md:p-10 rounded-3xl shadow-lg shadow-purple-200">
        <div className="flex items-center gap-8 justify-center">
          <p
            className={` border-8 transition-colors duration-500 ${
              currentStep === 1 ? "border-blue-700" : "border-gray-300"
            } md:min-w-40 min-w-24 rounded-lg`}
          ></p>
          <p
            className={` border-8 transition-colors duration-500 ${
              currentStep === 2 ? "border-blue-700" : "border-gray-300"
            } md:min-w-40 min-w-24 rounded-lg`}
          ></p>
          <p
            className={` border-8 transition-colors duration-500 ${
              currentStep === 3 ? "border-blue-700" : "border-gray-300"
            } md:min-w-40 min-w-24 rounded-lg`}
          ></p>
        </div>

        <form className="flex">
          {currentStep === 1 && (
            <Step1
              personalInfo={formState}
              setPersonalInfo={handleChange}
              nextStep={nextStep}
              errors={errors}
              handleSubmit={handleSubmitEmergency}
            />
          )}
          {currentStep === 2 && (
            <Step2
              contactInfo={formState}
              setContactInfo={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <Step3
              otherInfo={formState}
              setOtherInfo={handleChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              errors={errors}
              topicNames={topicNames}
            />
          )}
        </form>
      </div>
    </div>
  );
};

const Step1 = ({
  personalInfo,
  setPersonalInfo,
  nextStep,
  errors,
  handleSubmit,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl text-center my-5 font-bold">Neccessory fields</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-5 mb-5">
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">
            First Name:<i className="text-red-400 font-bold text-lg">*</i>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="enter your first name"
            value={personalInfo.firstName}
            onChange={(e) => setPersonalInfo("firstName", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white ${
              errors.firstName ? "border-2 border-red-600" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">
            Last Name: <i className="text-red-400 font-bold text-lg">*</i>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="enter your last name"
            value={personalInfo.lastName}
            onChange={(e) => setPersonalInfo("lastName", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white ${
              errors.lastName ? "border-2 border-red-600" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">
            Whatsapp: <i className="text-red-400 font-bold text-lg">*</i>
          </label>
          <input
            type="tel"
            name="waNumber"
            placeholder="9944267210"
            value={personalInfo.waNumber}
            onChange={(e) => setPersonalInfo("waNumber", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white ${
              errors.waNumber ? "border-2 border-red-600" : ""
            }`}
          />
          {errors.waNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.waNumber}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">
            Contact Number: <i className="text-red-400 font-bold text-lg">*</i>
          </label>
          <input
            type="tel"
            name="contactNumber"
            placeholder="9444267210"
            value={personalInfo.contactNumber}
            onChange={(e) => setPersonalInfo("contactNumber", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white ${
              errors.contactNumber ? "border-2 border-red-600" : ""
            }`}
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">
            Gender: <i className="text-red-400 font-bold text-lg">*</i>
          </label>
          <select
            type="text"
            name="gender"
            onChange={(e) => setPersonalInfo("gender", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white `}
            defaultValue={"MALE"}
          >
            <option value="MALE">male</option>
            <option value="FEMALE">female</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">
            Date Of Birth: <i className="text-red-400 font-bold text-lg">*</i>
          </label>
          <input
            type="date"
            name="dob"
            value={personalInfo.dob}
            onChange={(e) => setPersonalInfo("dob", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white ${
              errors.dob ? "border-2 border-red-600" : ""
            }`}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-700 text-white px-6 py-1.5 rounded-md transition-color duration-500 hover:bg-blue-800 focus:outline-none"
        >
          Submit
        </button>
        <button
          onClick={nextStep}
          type="button"
          className="bg-gray-200 text-black px-6 py-1.5 rounded-md transition-color duration-500 hover:bg-gray-400 focus:outline-none flex items-center justify-center gap-2"
        >
          Next
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const Step2 = ({ contactInfo, setContactInfo, nextStep, prevStep }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl text-center my-5 font-bold">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-5 mb-5">
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">Education:</label>
          <input
            type="text"
            name="education"
            value={contactInfo.education}
            placeholder="Bachelor of Science"
            onChange={(e) => setContactInfo("education", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">Occupations:</label>
          <input
            type="text"
            name="occupation"
            value={contactInfo.occupation}
            placeholder="Teacher / Marketing Specialist / Software Engineer"
            onChange={(e) => setContactInfo("occupation", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white `}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">Marital Status:</label>
          <select
            type="text"
            name="maritalStatus"
            onChange={(e) => setContactInfo("maritalStatus", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white`}
          >
            <option value="NonMarried">Non Married</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">email:</label>
          <input
            type="text"
            name="email"
            value={contactInfo.email}
            placeholder="xyz@example.com"
            onChange={(e) => setContactInfo("email", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">Address:</label>
          <input
            type="text"
            name="address"
            placeholder="123 Main Street
            Citytown, Stateville 98765
            Countryland"
            value={contactInfo.address}
            onChange={(e) => setContactInfo("address", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">City:</label>
          <input
            type="text"
            name="city"
            placeholder="pune"
            value={contactInfo.city}
            onChange={(e) => setContactInfo("city", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white `}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          type={"button"}
          className="bg-gray-200 text-black px-6 py-2 rounded-md transition-colors duration-500 hover:bg-gray-300 focus:outline-none  flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Previous
        </button>
        <button
          onClick={nextStep}
          type="button"
          className="bg-gray-200 text-black px-6 py-1.5 rounded-md transition-color duration-500 hover:bg-gray-400 focus:outline-none flex items-center justify-center gap-2"
        >
          Next
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const Step3 = ({
  otherInfo,
  setOtherInfo,
  prevStep,
  handleSubmit,
  topicNames,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl text-center my-5 font-bold">Other Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-5 mb-5">
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">Reference:</label>
          <input
            type="text"
            name="reference"
            value={otherInfo.reference}
            placeholder="friends / posters / college"
            onChange={(e) => setOtherInfo("reference", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">notes:</label>
          <input
            type="text"
            name="notes"
            value={otherInfo.notes}
            onChange={(e) => setOtherInfo("notes", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white `}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">No Of Children:</label>
          <input
            type="text"
            name="numberOfChildren"
            value={otherInfo.numberOfChildren}
            onChange={(e) => setOtherInfo("numberOfChildren", e.target.value)}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white `}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-gray-700 mb-2">
            Interested Activity :(select multiple){" "}
          </label>
          <select
            type="text"
            name="interestedTopics"
            onChange={(e) => {
              const { options } = e.target;
              const selectedValues = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => ({ id: Number(option.value) }));
              setOtherInfo("interestedTopics", selectedValues);
            }}
            className={`w-full px-4 py-1.5 border rounded-lg focus:outline-2 transition-all duration-500 outline-gray-200 focus:outline-purple-500 bg-white `}
            multiple
          >
            {topicNames?.length > 0 ? (
              topicNames?.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option disabled>{"No itemsTo Show"}</option>
            )}
          </select>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          type={"button"}
          className="bg-gray-200 text-black px-6 py-2 rounded-md transition-colors duration-500 hover:bg-gray-300 focus:outline-none  flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Previous
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-700 text-white px-6 py-1.5 rounded-md transition-color duration-500 hover:bg-blue-800 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ParticipantRegisteration;
