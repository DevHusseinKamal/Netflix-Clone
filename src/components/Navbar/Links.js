// (c) Hussein Kamal
// Created in 2022

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Hlogo from "../assets/H.jpg";

// navbar routes data
const navbarMap = [
  { title: "Home", path: "home" },
  { title: "TV Shows", path: "tv-shows" },
  { title: "Movies", path: "movies" },
  { title: "My List", path: "my-list" },
];

const Links = ({ classes, isShowNav, onLogout }) => {
  const email = useSelector((state) => state.auth.email);

  const navLists = navbarMap.map((item, index) => {
    return (
      <li key={index}>
        <NavLink
          className={(navData) => (navData.isActive ? classes.active : "")}
          to={`/${item.path}`}
        >
          {item.title}
        </NavLink>
      </li>
    );
  });

  return (
    <div
      className={`${classes.links} ${
        isShowNav ? classes["show-links"] : ""
      } d-flex`}
    >
      <div className={`${classes.block} d-flex flex-column`}>
        <span className={`${classes["user-info"]}`}>
          <img src={Hlogo} alt="H" />
          <small className="ms-2">{email}</small>
        </span>
        <button
          type="button"
          className="my-2 text-capitalize"
          onClick={onLogout}
        >
          logout of netflix
        </button>
      </div>
      {navLists}
    </div>
  );
};

export default Links;
