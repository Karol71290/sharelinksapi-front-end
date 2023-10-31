import React from "react";

function Button({
  children,
  onClick,
  type = "button",
  color = "indigo",
  dark = true,
  width = "full",
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`w-${width} flex justify-center 
      py-2.5 px-4 border border-transparent 
      text-md font-medium rounded-md
      bg-indigo-600 
      hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
      focus:ring-indigo-500
      text-${dark ? "white" : "gray-800"}
      ${disabled ? "cursor-not-allowed opacity-50" : ""}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
