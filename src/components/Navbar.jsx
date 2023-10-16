import React from "react";

// import Dropdown from "./Dropdown"; 
import Button from "./Button";

import  {singOut} from '../services/AuthService';
import { useAppContext } from "../context/AppContext";

const Navbar = () => {

  const { setIsLoggedIn } =  useAppContext();

  const handleSignOut= () => {

    singOut();
    setIsLoggedIn(false);
  }
  return (
    <nav className="bg-gray-800 py-6 px-20 text-white">
      <div className="flex justify-end items-center">
        <Button color={"indigo"} width="w-28" onClick={handleSignOut}>
          Salir
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ms-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </Button>

        {/* <div className="space-x-4">
          <Dropdown />
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
