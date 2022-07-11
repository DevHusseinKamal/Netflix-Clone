// (c) Hussein Kamal
// Created in 2022

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { netflixActions } from "../store/netflix-slice";

import LoadingSpinner from "../UI/LoadingSpinner";

import { MdClose } from "react-icons/md";

import classes from "./Details.module.css";
import RightContainer from "./RightContainer/RightContainer";
import LeftContainer from "./LeftContainer/LeftContainer";

const listsTitles = ["overview", "details"];

const flexBox = "d-flex justify-content-center align-items-center";

const Details = React.forwardRef((props, ref) => {
  const [listId, setListId] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();

  const spanRef = useRef();
  const btnRef = useRef();
  const containerRef = useRef();

  const hideDetails = () => {
    ref.current.style.opacity = null;
    ref.current.style.maxHeight = null;
    ref.current.style.display = "none";
  };

  const hideDetailsHandler = () => {
    props.setItemId(null);
    hideDetails();

    window.scrollTo(0, ref.current.offsetTop - 350);

    setTimeout(() => {
      btnRef.current.children[0].click();
      dispatch(netflixActions.removeUniqueObject(props.index));
    }, 500);
  };

  const slideHandler = (index, e) => {
    setListId(index);

    const position = e.target.getBoundingClientRect();
    spanRef.current.setAttribute(
      "style",
      `transform: translateX(calc((${index * 100}%) + (${
        index * 50
      }px))); width: ${position.width}px`
    );
    containerRef.current.style = `transform: translateX(${index * -50}%)`;
  };

  const ifLoctionIsList = () => {
    if (location.pathname === "/my-list") {
      hideDetails();
    }
  };

  const items = useSelector((state) => state.netflix.objectsDetails);
  const singleItem = items[props.index];

  let insertedItem;
  if (!singleItem) {
    insertedItem = <LoadingSpinner />;
  } else {
    insertedItem = (
      <div className={classes.container} ref={containerRef}>
        <LeftContainer
          singleItem={singleItem}
          index={props.index}
          inListPath={ifLoctionIsList}
        />
        <RightContainer singleItem={singleItem} />
      </div>
    );
  }

  const lists = listsTitles.map((list, index) => {
    return (
      <button
        key={index}
        type="button"
        onClick={slideHandler.bind(null, index)}
        className={`btns ${listId === index ? classes.active : ""}`}
      >
        {list}
      </button>
    );
  });

  return (
    <div ref={ref} className={`${classes.details} d-flex`}>
      <button
        className={`${classes.close} ${flexBox}`}
        type="button"
        onClick={hideDetailsHandler}
      >
        <MdClose />
      </button>
      <div className={classes.lists}>
        <div
          className={`${classes["btns-wrapper"]} d-flex justify-content-center`}
        >
          <div className={classes.control} ref={btnRef}>
            {lists}
            <span ref={spanRef}></span>
          </div>
        </div>
      </div>
      {insertedItem}
    </div>
  );
});

export default Details;
