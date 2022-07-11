// (c) Hussein Kamal
// Created in 2022

import React from "react";
import { useDispatch } from "react-redux";
import { netflixActions } from "../store/netflix-slice";

import { IoIosArrowDown } from "react-icons/io";

import classes from "./ShowDetails.module.css";

const ShowDetailsBtn = React.forwardRef(({ index, setItemId, id }, ref) => {
  const dispatch = useDispatch();

  const showDetailsHandler = (id) => {
    setItemId(id);
    dispatch(netflixActions.setUniqueObject({ id: id, index: index }));

    ref.current.style.opacity = 1;
    ref.current.style.maxHeight = "400px";

    window.scrollTo(0, ref.current.offsetTop - 150);
  };

  return (
    <button
      type="button"
      className={classes["show-info"]}
      onClick={showDetailsHandler.bind(null, id)}
    >
      <IoIosArrowDown className="svg" />
    </button>
  );
});

export default ShowDetailsBtn;
