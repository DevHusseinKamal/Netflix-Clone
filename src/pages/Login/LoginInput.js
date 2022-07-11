// (c) Hussein Kamal
// Created in 2022

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../components/store/ui-slice";

import classes from "./LoginInput.module.css";

const LoginInput = (props) => {
  const [labelClass, setLabelClass] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const inputRef = useRef();

  const dispatch = useDispatch();

  const message = useSelector((state) => state.ui.authMessage);

  const showPasswordHandler = () => {
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
      setIsShowPassword(false);
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(
      `.${classes["input-container"]} input`
    );

    if (
      (message.indexOf("EMAIL") !== -1 && props.type === "email") ||
      (message.indexOf("PASSWORD") !== -1 && props.type === "password")
    ) {
      inputs.forEach((input) => input.classList.remove(classes.borderBottom));
      inputRef.current.classList.add(classes.borderBottom);
    }
  }, [message, props.type]);

  useEffect(() => {
    if (props.hasError && message) {
      dispatch(uiActions.showAuthFailed(""));
    }
  }, [props.hasError, props.type, message, dispatch]);

  const InputClass = props.hasError ? classes.borderBottom : "";

  const isPasswordNotEmpty = props.value.trim().length !== 0;
  const isEmailMessage = message.includes("EMAIL") && props.type === "email";
  const isPasswordMessage =
    message.includes("PASSWORD") && props.type === "password";

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
        className={`ps-4 pt-4 pb-2 ${InputClass}`}
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
            onClick={showPasswordHandler}
          >
            {!isShowPassword ? "show" : "hide"}
          </button>
        </abbr>
      )}

      {!props.hasError && isEmailMessage && (
        <p className={classes["error-message"]}>{message}</p>
      )}

      {!props.hasError && isPasswordMessage && (
        <p className={classes["error-message"]}>{message}</p>
      )}
    </div>
  );
};

export default LoginInput;
