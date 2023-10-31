import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Alert = () => {
  const { alert, setAlert } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      let close = { show: false, message: null, type: "success" };
      setAlert({ ...close });
    }, 4000); // Cerrar después de 4 segundos
    return () => clearTimeout(timer);
  }, [alert]);

  // Mapa de iconos SVG según el tipo de alerta
  const iconMap = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 me-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 me-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 me-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    ),
  };

  return (
    <div
      className={`${
        alert?.show
          ? "opacity-100 translate-y-0 z-50 "
          : "opacity-0 -translate-y-2"
      } fixed bottom-0 right-0 mb-4 mr-4 p-4 rounded-lg shadow-lg transition-transform duration-300  ${
        alert?.type === "success"
          ? "bg-green-200 text-green-800"
          : alert?.type === "error"
          ? "bg-red-200 text-red-800"
          : "bg-blue-200 text-blue-800"
      }`}
    >
      <div className="flex items-center">
        {iconMap[alert?.type]}
        <p>{alert?.message}</p>
      </div>
    </div>
  );
};

export default Alert;
