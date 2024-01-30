import React, { useState } from "react";

const CreateProgramForm = () => {
  const [formData, setFormData] = useState({
    programName: "",
    programDescription: "",
    programPreacher: "",
    programCoordinator: "",
    programMentor: "",
    programIncharge: "",
    programType: "",
    audienceType: "",
    programLocation: "",
  });

  // Sample data for dropdown options
  const preacherOptions = [
    "Select Preacher",
    "Preacher 1",
    "Preacher 2",
    "Preacher 3",
  ];
  const coordinatorOptions = [
    "Select Coordinator",
    "Coordinator A",
    "Coordinator B",
    "Coordinator C",
  ];
  const mentorOptions = ["Select Mentor", "Mentor X", "Mentor Y", "Mentor Z"];
  const inchargeOptions = [
    "Select Incharge",
    "Incharge I",
    "Incharge II",
    "Incharge III",
  ];
  const typeOptions = ["Select Program Type", "Type A", "Type B", "Type C"];
  const audienceOptions = [
    "Select Audience Type",
    "Audience X",
    "Audience Y",
    "Audience Z",
  ];
  const locationOptions = [
    "Select Program Location",
    "Location 1",
    "Location 2",
    "Location 3",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    console.log("Form submitted:", formData);
    // You can send the form data to your backend or perform any other necessary actions
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-blue-100 p-6 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">
          Add New Program
        </h2>

        {/* Program Name */}
        <div className="mb-4">
          <label
            htmlFor="programName"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Name
          </label>
          <input
            type="text"
            id="programName"
            name="programName"
            value={formData.programName}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Program Description */}
        <div className="mb-4">
          <label
            htmlFor="programDescription"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Description
          </label>
          <textarea
            id="programDescription"
            name="programDescription"
            value={formData.programDescription}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {/* Program Preacher */}
        <div className="mb-4">
          <label
            htmlFor="programPreacher"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Preacher
          </label>
          <select
            id="programPreacher"
            name="programPreacher"
            value={formData.programPreacher}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          >
            {preacherOptions.map((preacher, index) => (
              <option key={index} value={preacher}>
                {preacher}
              </option>
            ))}
          </select>
        </div>

        {/* Program Coordinator */}
        <div className="mb-4">
          <label
            htmlFor="programCoordinator"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Coordinator
          </label>
          <select
            id="programCoordinator"
            name="programCoordinator"
            value={formData.programCoordinator}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          >
            {coordinatorOptions.map((coordinator, index) => (
              <option key={index} value={coordinator}>
                {coordinator}
              </option>
            ))}
          </select>
        </div>

        {/* Program Mentor */}
        <div className="mb-4">
          <label
            htmlFor="programMentor"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Mentor
          </label>
          <select
            id="programMentor"
            name="programMentor"
            value={formData.programMentor}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          >
            {mentorOptions.map((mentor, index) => (
              <option key={index} value={mentor}>
                {mentor}
              </option>
            ))}
          </select>
        </div>

        {/* Program Incharge */}
        <div className="mb-4">
          <label
            htmlFor="programIncharge"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Incharge
          </label>
          <select
            id="programIncharge"
            name="programIncharge"
            value={formData.programIncharge}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          >
            {inchargeOptions.map((incharge, index) => (
              <option key={index} value={incharge}>
                {incharge}
              </option>
            ))}
          </select>
        </div>

        {/* Program Type */}
        <div className="mb-4">
          <label
            htmlFor="programType"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Type
          </label>
          <select
            id="programType"
            name="programType"
            value={formData.programType}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          >
            {typeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Audience Type */}
        <div className="mb-4">
          <label
            htmlFor="audienceType"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Audience Type
          </label>
          <select
            id="audienceType"
            name="audienceType"
            value={formData.audienceType}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          >
            {audienceOptions.map((audience, index) => (
              <option key={index} value={audience}>
                {audience}
              </option>
            ))}
          </select>
        </div>

        {/* Program Location */}
        <div className="mb-4">
          <label
            htmlFor="programLocation"
            className="block text-blue-600 text-sm font-semibold mb-2"
          >
            Program Location
          </label>
          <select
            id="programLocation"
            name="programLocation"
            value={formData.programLocation}
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:border-blue-500"
          >
            {locationOptions.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProgramForm;
