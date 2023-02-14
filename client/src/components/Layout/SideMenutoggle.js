import React, { useRef, useEffect, useState } from "react";
import Sidemenu from "../views/UtilPage/Sidemenu";
import Button from "./Button";

export default function SideMenutoggle() {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={handleToggle}>토글버튼</Button>
      <div
        ref={ref}
        className={`fixed inset-0 overflow-hidden sidemenu ${
          isOpen ? "Open" : ""
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto relative">
              <div className="absolute top-0 left-0 flex sm:-ml-10 sm:pr-4">
                <button
                  type="button"
                  className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={handleToggle}
                >
                  <span className="sr-only">Close panel</span>
                  {/* <!-- Heroicon name: outline/x-mark --> */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex  h-full  overflow-y-scroll bg-white  shadow-xl">
                <Sidemenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
