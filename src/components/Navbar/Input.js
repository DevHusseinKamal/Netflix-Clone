// (c) Hussein Kamal
// Created in 2022

import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./Input.module.css";

const paddingStyles = "px-3 py-2";

const Input = ({ toggle }) => {
  const navigate = useNavigate();
  const [serchedData, setSerchedData] = useState([]);
  const [isShowSearchedData, setIsShowSearchedData] = useState(false);

  const inputRef = useRef();
  const keyword = useRef("");
  const netflixData = useSelector((state) => state.netflix.netflixData);

  const showSearch = toggle ? classes.show : "";

  useEffect(() => {
    if (!toggle) {
      inputRef.current.value = "";
    }
  }, [toggle]);

  const onKeyupHandler = (e) => {
    keyword.current = e.target.value.toLowerCase();
    if (keyword.current.trim().length > 0) {
      setIsShowSearchedData(true);
      setSerchedData(
        netflixData.filter(
          (item) => item.title.toLowerCase().indexOf(keyword.current) > -1
        )
      );
    } else {
      setIsShowSearchedData(false);
      setSerchedData([]);
    }
  };

  const getSingleItem = (id) => {
    navigate(`/search?id=${id}`);
  };

  useEffect(() => {
    const clickHandler = (e) => {
      if (!e.target.classList.contains(classes.search)) {
        setIsShowSearchedData(false);
      }
    };

    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, []);

  const setTypedParts = (item, matches) => {
    let typedParts = item.title.split(
      new RegExp(`${keyword.current.replace()}`, "g")
    );

    for (let i = 0; i < typedParts.length; i++) {
      if (i !== typedParts.length - 1) {
        let match = matches[i];
        while (typedParts[i + 1] === "" && typedParts[i + 2] === "") {
          match += matches[++i];
        }

        typedParts[i] = (
          <Fragment key={i}>
            {typedParts[i]}
            <span className={classes.highlighted}>{match}</span>
          </Fragment>
        );
      }
    }

    return typedParts;
  };

  const filterTypedParts = (item) => {
    const regexp = new RegExp(keyword.current, "g");
    const matches = item.title.match(regexp);

    return setTypedParts(item, matches);
  };

  let searchableData;
  if (serchedData.length <= 0) {
    searchableData = (
      <p className={`${classes.wrong} ${paddingStyles}`}>
        Cannot find your searched results
      </p>
    );
  } else {
    searchableData = serchedData.map((item) => {
      const typedParts = filterTypedParts(item);
      return (
        <div
          key={item.id}
          className={`${classes.param} ${paddingStyles}`}
          onClick={getSingleItem.bind(null, item.id)}
        >
          {typedParts}
        </div>
      );
    });
  }

  return (
    <div className={classes.container}>
      <input
        type="search"
        className={`${classes["input-search"]} ${showSearch} ps-1`}
        placeholder="Search..."
        ref={inputRef}
        onChange={onKeyupHandler}
      />
      {isShowSearchedData && (
        <div className={`${classes.search} text-capitalize`}>
          {searchableData}
        </div>
      )}
    </div>
  );
};

export default Input;
