// (c) Hussein Kamal
// Created in 2022

import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BiLike, BiDislike } from "react-icons/bi";

import classes from "./ListDetails.module.css";

const ListDetails = ({ title, rate }) => {
  return (
    <div
      className={`${classes.details} d-flex justify-content-between align-items-end mx-2`}
    >
      <div className="pb-2">
        <Link
          to="/watch"
          className={`${classes.icon} d-flex justify-content-center align-items-center`}
        >
          <FaPlay className="ms-1" />
        </Link>
        <p className="text-capitalize">{title}</p>
      </div>
      <div className={`${classes["btns-container"]} d-flex flex-column pb-4`}>
        <button type="button">
          <BiLike />
        </button>
        <button type="button">
          <BiDislike />
        </button>
        <button type="button" className={classes.rate}>
          {rate}
        </button>
      </div>
    </div>
  );
};

export default ListDetails;
