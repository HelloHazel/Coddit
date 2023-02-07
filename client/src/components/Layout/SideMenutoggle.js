import React from "react";
import Sidemenu from "../views/UtilPage/Sidemenu";

export default function SideMenutoggle() {
  return (
    <div>
      <div
        class="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div class="pointer-events-auto relative">
                <div class="absolute top-0 left-0 flex sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span class="sr-only">Close panel</span>
                    {/* <!-- Heroicon name: outline/x-mark --> */}
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div class="flex  h-full  overflow-y-scroll bg-white  shadow-xl">
                  <Sidemenu />

                  {/* <!-- /End replace --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
