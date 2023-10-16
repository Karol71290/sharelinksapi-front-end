import React, { useState, useEffect, useRef } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Manejador para cerrar el dropdown cuando se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Agregar un manejador de eventos de clic al documento cuando el dropdown se abre
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Limpiar el manejador de eventos cuando el componente se desmonta
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative group" ref={dropdownRef}>
      <button className="group-hover:text-gray-300" onClick={toggleDropdown}>
        Perfil
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg">
          <ul className="py-2 bg-white shadow-md rounded-lg border border-gray-200">
            <li>
              <a
                href="#"
                className="block text-gray-600 px-4 py-2 hover:bg-gray-100 hover:text-gray-800"
              >
                Configuración
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-600 px-4 py-2 hover:bg-gray-100 hover:text-gray-800"
              >
                Salir
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
