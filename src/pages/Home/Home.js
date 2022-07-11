// (c) Hussein Kamal
// Created in 2022

import { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import List from "../../components/List/List";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import classes from "./Home.module.css";

const sliceTenItems = (arr) => arr.slice(0, 10);

// get news data if a new movie or series is released
const sortedDescItems = (arr) => [...arr].sort((a, b) => b.id - a.id);

const Home = () => {
  const netflixData = useSelector((state) => state.netflix.netflixData);
  const actionData = useSelector((state) => state.netflix.actionTypes);
  const dramaData = useSelector((state) => state.netflix.dramaTypes);
  const romanceData = useSelector((state) => state.netflix.romanceTypes);

  let insertedData;
  if (!netflixData || !actionData || !dramaData || !romanceData) {
    insertedData = <LoadingSpinner />;
  } else {
    const newNetflixData = sliceTenItems(sortedDescItems(netflixData));
    const action = sliceTenItems(actionData);
    const drama = sliceTenItems(dramaData);
    const romance = sliceTenItems(romanceData);
    insertedData = (
      <Fragment>
        {/* Warning: you must increment index by 1...
          if you add more "List" component to work "Details" component correctly */}
        <List title="Watch in One Weekend" data={newNetflixData} index={0} />
        <List title="Action Mix" data={action} index={1} />
        <List title="Drama Mix" data={drama} index={2} />
        <List title="Romance Mix" data={romance} index={3} />
      </Fragment>
    );
  }

  return (
    <div className={classes.home}>
      <Header />
      {insertedData}
    </div>
  );
};

export default Home;
