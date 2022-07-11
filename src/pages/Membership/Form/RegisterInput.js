// (c) Hussein Kamal
// Created in 2022

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../components/store/ui-slice";

import classes from "./RegisterInput.module.css";

const RegisterInput = (props) => {
  const [labelClass, setLabelClass] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const inputRef = useRef();

  const dispatch = useDispatch();

  const message = useSelector((state) => state.ui.authMessage);

  const togglePasswordHandler = () => {
    setIsShowPassword((prevClick) => !prevClick);
  };

  const onFoucsHandler = (e) => {
    if (!e.target.classList.contains(classes["error-message"])) {
      inputRef.current.focus();

      setLabelClass(classes.change);
    }
  };

  const onBlurHandler = () => {
    if (props.value.trim().length === 0) {
      setLabelClass("");
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    if (message.indexOf("EMAIL") !== -1 && props.type === "password") {
      input.classList.add(classes.borderBottom);
    }
  }, [message, props.type]);

  useEffect(() => {
    if (props.hasError && message && props.type === "password") {
      dispatch(uiActions.showAuthFailed(""));
    }
  }, [props.hasError, props.type, message, dispatch]);

  const InputClass = props.hasError ? classes.borderBottom : "";

  const isPasswordNotEmpty = props.value.trim().length !== 0;
  const isEmailExists = message.includes("EMAIL") && props.type === "password";

  return (
    <div
      className={classes["input-container"]}
      onClick={onFoucsHandler}
      onBlur={onBlurHandler}
    >
      <input
        type={
          !isShowPassword && props.type === "password" ? props.type : "text"
        }
        className={`ps-2 pt-4 pb-2 ${InputClass}`}
        ref={inputRef}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={true}
      />
      <label className={labelClass}>{props.paragraph}</label>

      {props.hasError && (
        <p className={classes["error-message"]}>{props.message}</p>
      )}

      {isPasswordNotEmpty && props.type === "password" && (
        <abbr title={isShowPassword ? "Show Password" : "Hide Password"}>
          <button
            className={`${classes.show} text-uppercase px-2`}
            type="button"
            onClick={togglePasswordHandler}
          >
            {!isShowPassword ? "show" : "hide"}
          </button>
        </abbr>
      )}

      {!props.hasError && isEmailExists && (
        <p className={classes["error-message"]}>{message}</p>
      )}
    </div>
  );
};

export default RegisterInput;
