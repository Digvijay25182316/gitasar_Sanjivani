import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";

const AudienceType = [
  { name: "all", value: "ALL" },
  { name: "children", value: "CHILDREN" },
  { name: "boys", value: "BOYS" },
  { name: "girls", value: "GIRLS" },
  { name: "family", value: "FAMILY" },
  { name: "couple", value: "COUPLE" },
];
const ProgramType = [
  { name: "TempleProgram", value: "TempleProgram" },
  { name: "SocietyProgram", value: "SocietyProgram" },
  { name: "CollegeProgram", value: "CollegeProgram" },
];

function ProgramModal({ isOpen, onClose, children }) {
  const [isError, setIsError] = useState(false);
  const [volunteerArr, setVolunteerArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [audienceType, setAudienceType] = useState("");
  const [programType, setProgramType] = useState("");
  const [incharge, setIncharge] = useState(0);
  const [preacher, setPreacher] = useState(0);
  const [mentor, setMentor] = useState(0);
  const [coordinator, setCoordinator] = useState(0);
  const [location, setLocation] = useState("");
  const formData = {
    name: name,
    description: description,
    incharge: incharge,
    preacher: preacher,
    mentor: mentor,
    coordinator: coordinator,
    audienceType: audienceType,
    programType: programType,
    location: location,
  };

  async function submitHandler(e) {
    e.preventDefault();
    const header = new Headers();
    header.append("Content-Type", "application/json");
    if (
      mentor === 0 ||
      coordinator === 0 ||
      preacher === 0 ||
      incharge === 0 ||
      name === "" ||
      description === "" ||
      location === ""
    ) {
      toast.error("fill all the fields");
      return;
    }
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/program/create`, {
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
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIncharge(0);
      setMentor(0);
      setCoordinator(0);
      setIncharge(0);
      setName("");
      setDescription("");
      setLocation("");
      setProgramType("");
      setAudienceType("");
    }

    // await fetch(`${SERVER_ENDPOINT}/program/create`, {
    //   method: "POST",
    //   headers: header,
    //   body: JSON.stringify(formData),
    // })
    //   .then((data) => {
    //     if (data.ok) {
    //       return data.json();
    //     } else {
    //       setIsError(true);
    //       return data.json();
    //     }
    //   })
    //   .then((data) => {
    //     if (isError) {
    //       toast.error(data.message);
    //     } else {
    //       toast.success(data.message);
    //     }
    //   })
    //   .catch((err) => toast.error(err.message));
  }

  useEffect(() => {
    (async () => {
      fetch(`${SERVER_ENDPOINT}/volunteer/`)
        .then((data) => {
          if (data.ok) {
            return data.json();
          } else {
            setIsError(true);
            return data.json();
          }
        })
        .then((data) => {
          setVolunteerArr(data.content);
        });
    })();
  }, [isError]);

  const clear = () => {
    setIsError();
    setVolunteerArr([]);
    onClose();
  };

  if (isOpen)
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={clear}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl">
          <div className="md:w-[50vw] w-[85vw]">
            <div className="border-b m-5">
              <p className="font-semibold text-gray-600 text-lg">
                Create Program
              </p>
              <button
                className="absolute top-2 right-2 bg-red-200 text-red-700 p-2 rounded-full"
                onClick={clear}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 overflow-y-scroll h-[82vh] p-5">
              <form
                className="text-gray-600 flex flex-col gap-3"
                onSubmit={submitHandler}
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Program Name</label>
                  <input
                    type="text"
                    placeholder="Gitasar Batch 1"
                    name="name"
                    className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Program Description</label>
                  <textarea
                    placeholder="your description"
                    className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                  <SelectVolunteerInput
                    volunteerArr={volunteerArr}
                    isLoading={false}
                    label={"Incharge"}
                    setVolunteer={setIncharge}
                  />
                  <SelectVolunteerInput
                    volunteerArr={volunteerArr}
                    isLoading={false}
                    label={"Program Coordinator"}
                    setVolunteer={setCoordinator}
                  />
                  <SelectVolunteerInput
                    volunteerArr={volunteerArr}
                    isLoading={false}
                    label={"Program Preacher"}
                    setVolunteer={setPreacher}
                  />
                  <SelectVolunteerInput
                    volunteerArr={volunteerArr}
                    isLoading={false}
                    label={"Program Mentor"}
                    setVolunteer={setMentor}
                  />

                  <SelectType
                    TypeArr={AudienceType}
                    label={"Audience Type"}
                    setType={setAudienceType}
                    isLoading={isLoading}
                  />
                  <SelectType
                    isLoading={isLoading}
                    TypeArr={ProgramType}
                    label={"ProgramType"}
                    setType={setProgramType}
                  />
                </div>
                <div className="flex flex-col gap-2 mb-10">
                  <label className="font-semibold">Location</label>
                  <input
                    type="text"
                    placeholder="NVCC Temple"
                    name="location"
                    className="border px-4 py-1.5 rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white">
                  <button
                    className="w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border"
                    type="button"
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
        </div>
      </>
    );
}

export default ProgramModal;

function SelectVolunteerInput({
  volunteerArr,
  isLoading,
  label,
  setVolunteer,
}) {
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState({});
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
              {Object.keys(selectedVolunteer).length === 0
                ? "Select"
                : `${
                    selectedVolunteer?.initiatedName
                      ? selectedVolunteer?.initiatedName
                      : `${selectedVolunteer?.firstName} ${selectedVolunteer?.lastName}`
                  }`}
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
                {volunteerArr?.length > 0 ? (
                  volunteerArr.map((item) => (
                    <p
                      value={item.id}
                      key={item.id}
                      role="menu"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedVolunteer(item);
                        setIsOpenSelection(false);
                        setVolunteer(item.id);
                      }}
                    >
                      {item?.initiatedName
                        ? item?.initiatedName
                        : `${item.firstName} ${item.lastName}`}
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
}

const SelectType = ({ isLoading, label, TypeArr, setType }) => {
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
                      value={item.value}
                      key={index}
                      role="menu"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedType(item);
                        setIsOpenSelection(false);
                        setType(item.value);
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
