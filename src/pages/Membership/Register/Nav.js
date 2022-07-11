// (c) Hussein Kamal
// Created in 2022

import logo from "../../../components/assets/Netflix-Logo.png";
import SignButton from "../../../components/UI/SignButton";

import classes from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul className="d-flex justify-content-between align-items-center">
        <li>
          <img src={logo} alt="Netflix Logo" />
        </li>
        <li>
          <SignButton
            path="/login"
            title="sign in"
            classes="py-1 px-3 text-capitalize"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
