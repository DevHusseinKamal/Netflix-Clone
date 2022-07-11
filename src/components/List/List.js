// (c) Hussein Kamal
// Created in 2022

import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { netflixActions } from "../store/netflix-slice";
import useWindow from "../hooks/use-window";

import Details from "../Details/Details";
import LoadingSpinner from "../UI/LoadingSpinner";
import ListWrapper from "./ListWrapper";
import ShowDetailsBtn from "./ShowDetailsBtn";
import ListDetails from "./ListDetails";
import Modal from "../UI/Modal";

import classes from "./List.module.css";

const List = (props) => {
  const dispatch = useDispatch();
  const detailsRef = useRef();

  const [modal, setModal] = useState(false);
  const [itemId, setItemId] = useState(null);

  const { currentWidth } = useWindow();

  useEffect(() => {
    if (currentWidth <= 767) {
      setItemId(null);

      const details = [...document.querySelectorAll("*[style]")].slice(1);
      details.forEach((item) => (item.style.maxHeight = null));
    }

    if (currentWidth > 767 && modal) {
      setModal(false);

      document.body.style.overflowY = "scroll";
    }
  }, [currentWidth, modal, dispatch]);

  const showModalHandler = (id) => {
    if (window.innerWidth <= 767) {
      setModal(true);
      dispatch(netflixActions.setUniqueObject({ id, index: props.index }));

      document.body.style.overflowY = "hidden";
    }
  };

  let insertedData;
  if (!props.data.length) {
    insertedData = <LoadingSpinner />;
  } else {
    insertedData = props.data.map((item) => {
      return (
        <div
          key={item.id}
          className={`${classes.item} ${
            itemId === item.id ? "active-border" : ""
          }`}
          onClick={showModalHandler.bind(null, item.id)}
        >
          <div className={classes.image}>
            <img src={item.cover} alt={item.title} />
          </div>
          <div className={classes.info}>
            <div className={classes.player}>
              <video autoPlay={true} muted={true} loop={true}>
                <source src={item.shortVideo} type="video/mp4" />
              </video>
            </div>
            <ListDetails title={item.title} rate={item.rate} />
            <ShowDetailsBtn
              index={props.index}
              id={item.id}
              setItemId={setItemId}
              ref={detailsRef}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <Fragment>
      {modal &&
        ReactDOM.createPortal(
          <Modal index={props.index} modal={modal} setModal={setModal} />,
          document.getElementById("modal")
        )}
      <ListWrapper
        listProps={props}
        insertedData={insertedData}
        classes={classes}
      />
      <Details ref={detailsRef} index={props.index} setItemId={setItemId} />
    </Fragment>
  );
};

export default List;
