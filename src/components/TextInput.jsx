import React from "react";

function TextInput({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete="off"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
      />
    </div>
  );
}

export default TextInput;
