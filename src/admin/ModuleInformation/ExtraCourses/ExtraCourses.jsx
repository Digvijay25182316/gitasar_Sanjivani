import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ExtraCourses = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Fullname: "",
    PhoneNumber: "",
    city: "",
    language: "",
    gender: "",
    age: "",
    program: [],
    date: new Date().toUTCString(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox inputs separately
    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          program: [...formData.program, value],
        });
      } else {
        setFormData({
          ...formData,
          program: formData.program.filter((item) => item === value),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen">
      <div className="">
        <h1 className="text-4xl text-center my-10 font-extrabold">
          Register for Gitasaar
        </h1>
        <div className="w-full flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8 mx-auto m-5">
              <div className="md:w-[40vw] w-80 mx-auto  flex flex-col gap-3">
                <label className="text-xl font-bold" htmlFor="name">
                  Enter your full name{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <input
                  onChange={handleChange}
                  name="Fullname"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                />
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="phone number">
                  Enter your Phone number{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <input
                  onChange={handleChange}
                  name="PhoneNumber"
                  type="number"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  maxLength={10}
                />
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="language">
                  Your preferred language{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <select
                  name="language"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  onChange={handleChange}
                >
                  <option value="">Your preferred language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="marathi">Marathi</option>
                </select>
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="Gender">
                  Please choose Gender{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <select
                  name="gender"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  onChange={handleChange}
                >
                  <option value="">Enter your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="Gender">
                  Choose Your age <i className="text-bold text-red-500">*</i>
                </label>
                <select
                  name="age"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select your age</option>
                  <option value="15-20">15-20</option>
                  <option value="20-30">20-30</option>
                  <option value="30-40">30-40</option>
                  <option value="40-50">40-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="City">
                  Exact Address<i className="text-bold text-red-500">*</i>
                </label>
                <input
                  onChange={handleChange}
                  name="city"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                />
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <div className="text-xl font-bold" htmlFor="program_name">
                  Which program(s) you want to enrol in
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      name="program"
                      value="Gitasar Temple program (Summary Study of Bhagvada Gita)"
                      onChange={handleChange}
                      className="w-5"
                    />
                    Gitasar Temple program (Summary Study of Bhagvada Gita)
                  </label>
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      name="program"
                      value="CHILDREN Value Education"
                      onChange={handleChange}
                      className="w-5"

                      // checked={formData.program==="Gitasaar For Girls Program"}
                    />
                    CHILDREN Value Education
                  </label>
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      name="program"
                      value="Host program at your Society "
                      onChange={handleChange}
                      className="w-5"
                    />
                    Host program at your Society
                  </label>
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      name="program"
                      value=" Daily Book Reading online (SPORT)"
                      onChange={handleChange}
                      className="w-5"
                    />
                    Daily Book Reading online (SPORT)
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-xl font-bold bg-gray-700 text-white px-3 py-1 rounded-xl hover:bg-gray-900 w-max"
              >
                Confirm Registeration For Gita Saar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExtraCourses;
