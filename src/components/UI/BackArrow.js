// (c) Hussein Kamal
// Created in 2022

import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import classes from "./BackArrow.module.css";

const BackArrow = () => {
  const navigate = useNavigate();

  const navigateBackHandler = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={`${classes.btn} ms-4 d-flex align-items-center justify-content-center`}
      onClick={navigateBackHandler}
    >
      <BsArrowLeft className="fs-2 fw-bolder" />
    </button>
  );
};

export default BackArrow;
