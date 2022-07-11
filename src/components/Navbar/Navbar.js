// (c) Hussein Kamal
// Created in 2022

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import { IoMdNotifications, IoMdArrowDropdown } from "react-icons/io";

import logo from "../assets/Netflix-Logo.png";
import Hlogo from "../assets/H.jpg";

import Input from "./Input";
import Options from "./Options";
import Links from "./Links";

import classes from "./Navbar.module.css";

const flexBox = "d-flex align-items-center";

const Navbar = () => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isShowNav, setIsShowNav] = useState(false);
  const [isShowInput, setIsShowInput] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);

  const onLogoutHandler = () => {
    dispatch(authActions.logoutHandler());
    navigate("/logout", { replace: true });
  };

  const toggleNavHandler = () => {
    setIsShowNav((prevShow) => !prevShow);
  };

  const toggleMenuHandler = () => {
    setIsShowOptions((prevClick) => !prevClick);
  };

  const showInputHandler = () => {
    setIsShowInput((prevClick) => !prevClick);
  };

  // change background when scroll
  useEffect(() => {
    const OnWindowScroll = () => {
      if (window.scrollY < 80) {
        setIsScroll(false);
        return;
      }

      setIsScroll(true);
    };

    window.addEventListener("scroll", OnWindowScroll);

    return () => window.removeEventListener("srcoll", OnWindowScroll);
  }, []);

  const navClass = isScroll ? classes.scroll : "";

  return (
    <nav className={`${classes.nav} ${navClass} pt-3`}>
      <ul className="d-flex justify-content-between">
        <div className={`${classes.right} ${flexBox}`}>
          <GiHamburgerMenu
            className={classes.icon}
            onClick={toggleNavHandler}
          />
          <li>
            <Link to="/home" className="mx-3">
              <img src={logo} alt="Netflix Logo" />
            </Link>
          </li>
          <Links
            classes={classes}
            isShowNav={isShowNav}
            onLogout={onLogoutHandler}
          />
        </div>
        <div className={`${classes.left} ${flexBox} me-5`}>
          <Input toggle={isShowInput} />
          <ImSearch className={classes.search} onClick={showInputHandler} />
          <IoMdNotifications className={classes.not} />
          <span
            className={`${classes["user-info"]} ${classes.blockTwo} ${flexBox} ms-3`}
            onClick={toggleMenuHandler}
          >
            <img src={Hlogo} alt="H" />
            <IoMdArrowDropdown />
          </span>
        </div>
      </ul>
      {isShowOptions && <Options email={email} onLogout={onLogoutHandler} />}
    </nav>
  );
};

export default Navbar;
