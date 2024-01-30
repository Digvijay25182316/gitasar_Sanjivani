import { CheckCircleIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import exportAsImage from "./ExportAsImage";
import QRCode from "react-qr-code";

function QrCode({ url, courseCode }) {
  const [QrCodeOpen, setQrOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const qrCodeRef = useRef();
  const downloadQRCode = async () => {
    const canvas = qrCodeRef.current;
    setIsLoading(true);
    await exportAsImage(canvas, `${courseCode}-attendance`)
      .then((data) => setSuccess(true))
      .catch((err) => console.log(err))
      .finally((data) => setIsLoading(false));
  };
  useEffect(() => {
    setTimeout(() => {
      if (success) {
        setSuccess(false);
      }
    }, 4000);
  }, [success]);
  return (
    <div>
      <button onClick={() => setQrOpen(true)}>
        <QrCodeIcon className="h-5 w-5 text-blue-700" />
      </button>
      <QrCodeModal isOpen={QrCodeOpen} setIsOpen={() => setQrOpen(false)}>
        <div className={`${isLoading ? "opacity-50" : ""}`}>
          <div ref={qrCodeRef}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={url}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="flex items-center pt-5 justify-center gap-5">
            <button
              className={`${
                success ? "bg-green-300" : "px-4 py-1 text-blue-700 bg-blue-300"
              } text-lg rounded-lg min-w-[100px] flex items-center justify-center`}
              onClick={downloadQRCode}
              disabled={isLoading}
            >
              {!success ? (
                isLoading ? (
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  "download"
                )
              ) : (
                <div>
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
              )}
            </button>
            <button
              className="px-2 py-1 bg-red-100 text-red-700 text-lg rounded-lg"
              onClick={() => setQrOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </QrCodeModal>
    </div>
  );
}

export default QrCode;

function QrCodeModal({ isOpen, setIsOpen, children }) {
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={setIsOpen}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white p-5 rounded-2xl">
          {children}
        </div>
      </>
    );
  }
}
