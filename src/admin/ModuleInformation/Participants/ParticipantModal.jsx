import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { SERVER_ENDPOINT } from "../../config/Server";

function ParticipantModal({ isOpen, setIsOpen }) {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [optionsArr, setOptions] = useState([]);
  const formRef = useRef();
  const formData = {
    firstName: formRef?.current?.firstName.value,
    lastName: formRef?.current?.lastName.value,
    gender: formRef?.current?.gender.value,
    dob: formRef?.current?.dob.value,
    waNumber: formRef?.current?.waNumber.value,
    contactNumber: formRef?.current?.contactNumber.value,
  };

  console.log(
    // formRef?.current?.firstName.value,
    // formRef?.current?.lastName.value,
    // formRef?.current?.gender.value,
    formRef?.current?.dob.value
    // formRef?.current?.waNumber.value,
    // formRef?.current?.contactNumber.value
  );
  async function submitHandler(e) {
    e.preventDefault();
    const header = new Headers();
    console.log(formData);
    header.append("Content-Type", "application/json");
    // await fetch(`${SERVER_ENDPOINT}/participant/create`, {
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

  // useEffect(() => {
  //   (async () => {
  //     fetch(`${SERVER_ENDPOINT}/volunteer/`)
  //       .then((data) => {
  //         if (data.ok) {
  //           return data.json();
  //         } else {
  //           setIsError(true);
  //           return data.json();
  //         }
  //       })
  //       .then((data) => {
  //         setOptions(data.content);
  //       });
  //   })();
  // }, [isError]);
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={setIsOpen}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl">
          <div className="">
            <div className="flex flex-col px-5 py-1.5">
              <p className="text-lg font-semibold">Participant Registeration</p>
              <p className="text-gray-500 text-sm">
                participant registeration with neccessory fields
              </p>
            </div>
            <div className="overflow-y-scroll p-5 mx-1 w-full">
              <form
                className="md:w-[500px] w-[80vw] mb-20"
                ref={formRef}
                onSubmit={submitHandler}
              >
                <div className="flex md:flex-row flex-col items-center gap-5 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="flex items-center">First Name</label>
                    <input
                      type="text"
                      className="px-4 py-1.5 rounded-md border w-full"
                      name="firstName"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="flex items-center">Last Name</label>
                    <input
                      type="text"
                      className="px-4 py-1.5 rounded-md border w-full"
                      name="lastName"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-5 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="flex items-center">Whatsapp</label>
                    <input
                      type="tel"
                      className="px-4 py-1.5 rounded-md border w-full"
                      name="waNumber"
                      placeholder="8989952879"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="flex items-center">Phone</label>
                    <input
                      type="tel"
                      className="px-4 py-1.5 rounded-md border w-full"
                      name="contactNumber"
                      placeholder="8989952879"
                    />
                  </div>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-5 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="flex items-center">Gender</label>
                    <select
                      className="px-4 py-1.5 rounded-md border w-full bg-white"
                      defaultValue={"MALE"}
                      name="gender"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="flex items-center">Date of birth</label>
                    <input
                      type="date"
                      className="px-4 py-1.5 rounded-md border w-full"
                      name="dob"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white rounded-b-2xl">
                  <button
                    className={`w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border`}
                    type="button"
                    disabled={isLoading}
                  >
                    cancel
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
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ParticipantModal;
