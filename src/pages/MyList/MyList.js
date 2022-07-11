// (c) Hussein Kamal
// Created in 2022

import { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import List from "../../components/List/List";

import { ImFilesEmpty } from "react-icons/im";

import classes from "./MyList.module.css";

const MyList = () => {
  const list = useSelector((state) => state.netflix.list);

  let insertedData;
  if (!list.length) {
    insertedData = (
      <div className="d-flex justify-content-center">
        <h1 className={`${classes.h1} text-uppercase`}>
          my list is empty <ImFilesEmpty />
        </h1>
      </div>
    );
  } else {
    insertedData = (
      <Fragment>
        <Header />
        <List title="My List" data={list} index={0} />
      </Fragment>
    );
  }

  return <div className={classes["my-list"]}>{insertedData}</div>;
};

export default MyList;
