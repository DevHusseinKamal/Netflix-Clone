// (c) Hussein Kamal
// Created in 2022

import { FiLogOut } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";

import classes from "./Options.module.css";

const styles =
  "d-flex align-items-center justify-content-between text-capitalize";

const Options = ({ email, onLogout }) => {
  return (
    <div className={`${classes.options} d-flex flex-column p-1`}>
      <abbr className={`${styles} mb-1`} title={email}>
        email <MdAlternateEmail />
      </abbr>
      <button type="button" className={styles} onClick={onLogout}>
        logout
        <FiLogOut />
      </button>
    </div>
  );
};

export default Options;
