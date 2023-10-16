// Modal.js
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from "./Button";

const Modal = forwardRef(({ title, textButton, children }, ref) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  return (
    <>
      <Button onClick={openModal} color="indigo" >
        {textButton}
      </Button>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-container bg-white rounded-xl  md:w-2/4 lg:max-w-xl w-full  ">
            <div className="modal-header flex justify-between p-4  rounded-xl bg-indigo-50 ">
              <h2 className="text-lg font-semibold">{title}</h2>

              <button
                onClick={closeModal}
                className=" text-gray-600 hover:text-gray-800 hover:bg-slate-50 p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="modal-body p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
});

export default Modal;
