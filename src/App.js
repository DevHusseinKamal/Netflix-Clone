// (c) Hussein Kamal
// Created in 2022

import React, { Fragment, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Route, Routes } from "react-router-dom";

import LoadingSpinner from "./components/UI/LoadingSpinner";
import Logout from "./pages/Logout/Logout";
import NetflixContent from "./components/Netflix/NetflixContent";

import { data } from "./data";
import { getData, sendData } from "./components/store/netflix-actions";
import { netflixActions } from "./components/store/netflix-slice";
import { uiActions } from "./components/store/ui-slice";

const Register = React.lazy(() =>
  import("./pages/Membership/Register/Register")
);
const Login = React.lazy(() => import("./pages/Login/Login"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const TVShows = React.lazy(() => import("./pages/TvShows/TVShows"));
const Movies = React.lazy(() => import("./pages/Movies/Movies"));
const MyList = React.lazy(() => import("./pages/MyList/MyList"));
const Lost = React.lazy(() => import("./pages/Lost/Lost"));
const Watch = React.lazy(() => import("./pages/Watch/Watch"));
const Info = React.lazy(() => import("./pages/Info/Info"));

let isBlock = false;
let isBlockTwo = false;

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const netflixData = useSelector((state) => state.netflix.netflixData);
  const loading = useSelector((state) => state.ui);
  const myList = useSelector((state) => state.netflix.list);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      document.title = "Netflix - Watch TV Shows Online, Watch Movies Online";
      return;
    }

    document.title = "Netflix";
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      dispatch(uiActions.resetMessage());
    }
  }, [dispatch, location.pathname]);

  // send data to database
  useEffect(() => {
    dispatch(sendData({ data, type: "netflix" }));
  }, [dispatch]);

  // get data from database
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(netflixActions.setFilteredData("series"));
    dispatch(netflixActions.setFilteredData("movie"));
    dispatch(netflixActions.setDataTypes("action"));
    dispatch(netflixActions.setDataTypes("drama"));
    dispatch(netflixActions.setDataTypes("romance"));
    if (isBlockTwo) {
      dispatch(sendData({ data: netflixData, type: "netflix" }));
    }
    isBlockTwo = true;
  }, [dispatch, netflixData]);

  useEffect(() => {
    if (isBlock) {
      dispatch(sendData({ data: myList, type: "list" }));
    }
    isBlock = true;
  }, [dispatch, myList]);

  const length = netflixData.length;

  const serachPathRegExp = new RegExp(
    `^/search\\?id=([1-9]|[1-5][0-9]|${length})$`
  );

  let layOut;
  if (loading.message === "Success") {
    layOut = (
      <Fragment>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {!isLoggedIn && <Route path="/logout" element={<Logout />} />}
            {/* Add navigation guards */}
            {isLoggedIn && (
              <Fragment>
                <Route path="/" element={<NetflixContent />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/tv-shows" element={<TVShows />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/my-list" element={<MyList />} />
                </Route>
                <Route path="/watch" element={<Watch />} />
                {serachPathRegExp.test(
                  `${location.pathname}${location.search}`
                ) ? (
                  <Route path="/search" element={<Info />} />
                ) : (
                  <Route path="*" element={<Lost />} />
                )}
              </Fragment>
            )}
            <Route path="*" element={<Lost />} />
          </Routes>
        </Suspense>
      </Fragment>
    );
  } else {
    layOut = (
      <Fragment>
        {loading.isLoading && <LoadingSpinner />}
        {!loading.isLoading && <p className="error">{loading.message}</p>}
      </Fragment>
    );
  }

  return layOut;
};

export default App;
