import { NavLink } from "react-router-dom";

const NavBar = ({ containerStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-class hover:translate-x-3 transition-all" : " hover:translate-x-3 transition-all")}
      >
        Main
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) => (isActive ? "active-class  hover:translate-x-3 transition-all" : "hover:translate-x-3 transition-all")}
      >
        Nos Services
      </NavLink>
    
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active-class  hover:translate-x-3 transition-all" : "hover:translate-x-3 transition-all")}
      >
        About us{" "}
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active-class" : "hover:translate-x-3 transition-all")}
      >
        Contact Us{" "}
      </NavLink>
    </div>
  );
};

export default NavBar;
