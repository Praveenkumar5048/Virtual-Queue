import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-[100vh] bg-[url('/hero-section.jpg')] md:bg-left-top bg-cover bg-no-repeat bg-center">
      <div className="w-full h-full bg-black/20 flex justify-center items-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center lg:flex-row lg:justify-between px-6 py-3">
          {/* First Section */}
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white py-2 px-6">
              Your Health
              <br />
              <span className="text-theme">Is Our</span>
              <br />
              <span className="text-theme">Mission</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
            <NavLink to="/alldoctors">
            <button className="flex items-center rounded-full px-4 py-3 text-sm font-semibold shadow-sm hover:shadow-lg bg-theme hover:bg-onhover text-text mt-4">
              <img
                src="https://images.apollo247.in/images/ic-doctor.svg"
                alt="icon"
                className="w-8 h-8 mr-3"
              />
              Book Appointment
              <IoIosArrowForward className="" />
            </button>
            </NavLink>
            <NavLink to="/register/doctor">
            <button className="flex items-center rounded-full px-4 py-3 text-sm font-semibold shadow-sm hover:shadow-lg bg-theme hover:bg-onhover text-text mt-4">
              <img
                src="https://images.apollo247.in/images/ic-doctor.svg"
                alt="icon"
                className="w-8 h-8 mr-3"
              />
              Register Doctor
              <IoIosArrowForward className="" />
            </button>
            </NavLink>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default Hero;
