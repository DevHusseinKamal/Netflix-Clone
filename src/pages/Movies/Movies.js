// (c) Hussein Kamal
// Created in 2022

import { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import List from "../../components/List/List";

import classes from "./Movies.module.css";

const filteredTypes = (arr, type) =>
  arr.filter((item) => item.typeOfEmployment === type);

const Movies = () => {
  const movies = useSelector((state) => state.netflix.movies);

  const psychologicalData = filteredTypes(movies, "psychological");
  const actionData = filteredTypes(movies, "action");
  const sciFiData = filteredTypes(movies, "sci-fi");
  const dramaData = filteredTypes(movies, "drama");
  const romanceData = filteredTypes(movies, "romance");

  let putData = (
    <Fragment>
      {/* Warning: you must increment index by 1...
        if you add more "List" component to work "Details" component correctly */}
      <List title="Action" data={actionData} index={0} />
      <List title="Psychological" data={psychologicalData} index={1} />
      <List title="Sci-fi" data={sciFiData} index={2} />
      <List title="Drama" data={dramaData} index={3} />
      <List title="Romance" data={romanceData} index={4} />
    </Fragment>
  );

  return (
    <div className={classes.movies}>
      <Header />
      {putData}
    </div>
  );
};

export default Movies;
