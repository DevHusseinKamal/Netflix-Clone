// (c) Hussein Kamal
// Created in 2022

import { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import List from "../../components/List/List";

import classes from "./TvShows.module.css";

const filteredTypes = (arr, type) =>
  arr.filter((item) => item.typeOfEmployment === type);

const TVShows = () => {
  const tvShows = useSelector((state) => state.netflix.tvShows);

  const dramaData = filteredTypes(tvShows, "drama");
  const romanceData = filteredTypes(tvShows, "romance");
  const fantasyData = filteredTypes(tvShows, "fantasy");
  const actionData = filteredTypes(tvShows, "action");
  const thrillerData = filteredTypes(tvShows, "thriller");

  let insertedData = (
    <Fragment>
      {/* Warning: you must increment index by 1...
        if you add more "List" component to work "Details" component correctly */}
      <List title="Drama" data={dramaData} index={0} />
      <List title="Romance" data={romanceData} index={1} />
      <List title="Fantasy" data={fantasyData} index={2} />
      <List title="Action" data={actionData} index={3} />
      <List title="Thriller" data={thrillerData} index={4} />
    </Fragment>
  );

  return (
    <div className={classes["tv-shows"]}>
      <Header />
      {insertedData}
    </div>
  );
};

export default TVShows;
