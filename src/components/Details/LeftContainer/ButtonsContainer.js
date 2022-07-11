// (c) Hussein Kamal
// Created in 2022

import { Link } from "react-router-dom";
import { netflixActions } from "../../store/netflix-slice";
import { useDispatch } from "react-redux";

import { FaPlay } from "react-icons/fa";
import { BiLike, BiDislike, BiCheck } from "react-icons/bi";
import { CgFileRemove } from "react-icons/cg";
import { MdOutlineAdd } from "react-icons/md";

import classes from "./ButtonsContainer.module.css";

const flexBox = "d-flex justify-content-center align-items-center";

const ButtonsContainer = ({ singleItem, index, inListPath }) => {
  const dispatch = useDispatch();

  const addToListHandler = (id) => {
    dispatch(netflixActions.setListHandler({ id, index }));
  };

  const removeFromListHandler = (id) => {
    inListPath();
    dispatch(netflixActions.removeItemfromList({ id, index }));
  };

  return (
    <div className={`${classes["btn-container"]} d-flex`}>
      <Link to="/watch" className="text-capitalize">
        <FaPlay className="me-2" /> play
      </Link>
      <button
        type="button"
        onClick={addToListHandler.bind(null, singleItem.id)}
        disabled={singleItem.inList}
        className={`${singleItem.inList ? classes.check : ""} text-capitalize`}
      >
        {!singleItem.inList ? (
          <MdOutlineAdd className="me-2" />
        ) : (
          <BiCheck className="me-2" />
        )}{" "}
        my list
      </button>
      <button type="button">
        <BiLike />
      </button>
      <button type="button">
        <BiDislike />
      </button>
      {singleItem.inList && (
        <button
          type="button"
          onClick={removeFromListHandler.bind(null, singleItem.id)}
        >
          <abbr className={flexBox} title="Remove from list">
            <CgFileRemove />
          </abbr>
        </button>
      )}
    </div>
  );
};

export default ButtonsContainer;
