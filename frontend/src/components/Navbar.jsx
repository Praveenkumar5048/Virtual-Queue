import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router";
import logo from "/logo.svg";


function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
      setLoggedIn(token ? true : false);
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate("/");
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    
    if (offset > 200) {
      setScrolled(false);
    } else {
      setScrolled(false);
    }
  };

  // sticky navbar on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${scrolled
        ? "sticky top-0 delay-500 ease animate-[stickyNavbar fill-mode-forwards] " : ""} w-full h-[8vh]  bg-primary `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between lg:px-6  px-3 py-3">
        {/* logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-8 " />
          <h1 className="font-medium text-2xl text-text">MediQueue</h1>
        </div>

        {/* Nav Menus */}
        <div className="hidden md:block">
          <ul className="flex justify-between gap-8 items-center">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `text-sm font-semibold relative cursor-pointer before:block before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-0.5 before:rounded-full before:bg-text before:transition-all before:delay-150 before:ease-in-out hover:before:w-full hover:text-text ${isActive ? "text-text" : "text-text/70"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/alldoctors"}
                className={({ isActive }) =>
                  `text-sm font-semibold relative cursor-pointer before:block before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-0.5 before:rounded-full before:bg-text before:transition-all before:delay-150 before:ease-in-out hover:before:w-full hover:text-text ${isActive ? "text-text" : "text-text/70"
                  }`
                }
              >
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/appointment"}
                className={({ isActive }) =>
                  `text-sm font-semibold relative cursor-pointer before:block before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-0.5 before:rounded-full before:bg-text before:transition-all before:delay-150 before:ease-in-out hover:before:w-full hover:text-text ${isActive ? "text-text" : "text-text/70"
                  }`
                }
              >
                My Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/aboutus"}
                className={({ isActive }) =>
                  `text-sm font-semibold relative cursor-pointer before:block before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-0.5 before:rounded-full before:bg-text before:transition-all before:delay-150 before:ease-in-out hover:before:w-full hover:text-text ${isActive ? "text-text" : "text-text/70"
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            {!loggedIn ? (
            <>
              <li className="hover:scale-105">
                <NavLink
                  to={"/login"}
                  className="text-sm text-theme bg-text font-semibold relative cursor-pointer border rounded-3xl px-5 py-2"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li className="hover:scale-105 text-sm text-theme bg-text font-semibold relative cursor-pointer border rounded-3xl px-5 py-2"
            onClick={handleLogout}>
              Logout
            </li>
          )}

          </ul>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
