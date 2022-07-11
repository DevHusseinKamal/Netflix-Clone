// (c) Hussein Kamal
// Created in 2022

import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

const NetflixContent = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default NetflixContent;
