// (c) Hussein Kamal
// Created in 2022

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import logo from "../../components/assets/Netflix-Logo.png";

import classes from "./Info.module.css";
import BackArrow from "../../components/UI/BackArrow";

const flexBox = "d-flex align-items-center";

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const netflixData = useSelector((state) => state.netflix.netflixData);

  const queryParams = new URLSearchParams(location.search);
  const id = +queryParams.get("id");

  const singleItem = netflixData.find((item) => item.id === id);

  const watchHandler = () => {
    navigate("/watch");
  };

  const insertedData = (
    <div className={classes.info}>
      <header>
        <BackArrow />
        <img src={singleItem.wallpaper} alt={singleItem.title} />
        <img className={classes.logo} src={logo} alt="Netflix Logo" />
        <div className={classes.container}>
          <div>
            <h1 className="text-capitalize">{singleItem.title}</h1>
            <span className="text-capitalize">
              by "{singleItem.details[0].director}"
            </span>
            <button
              type="button"
              className={`${flexBox} px-2 py-1 text-capitalize mt-2 mb-4`}
              onClick={watchHandler}
            >
              watch now <FaPlay className="ms-2" />
            </button>
            <div
              className={`${classes.maturityRatings} ${flexBox} justify-content-center fs-5 p-2`}
            >
              {singleItem.maturityRatings}
            </div>
          </div>
        </div>
      </header>
    </div>
  );

  return insertedData;
};

export default Info;
