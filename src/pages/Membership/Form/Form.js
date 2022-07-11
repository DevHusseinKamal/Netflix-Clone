// (c) Hussein Kamal
// Created in 2022

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useForm from "../../../components/hooks/use-form";

import { signUp } from "../../../components/Auth/Auth";
import RegisterInput from "./RegisterInput";

import { IoIosArrowForward } from "react-icons/io";

import classes from "./Form.module.css";

let isBlock = false;

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const InputForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [activationBtn, setActivationBtn] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  // email value and validation
  const {
    value: emailValue,
    hasError: emailHasError,
    onBlur: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useForm((value) => value.match(emailRegExp));

  // password value and validation
  const {
    value: passwordValue,
    hasError: passwordHasError,
    onBlur: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
  } = useForm((value) => value.trim().length >= 6);

  const getEmailHandler = () => {
    setIsPasswordShow(true);
  };

  useEffect(() => {
    if (emailValue.match(emailRegExp)) {
      setActivationBtn(true);
    } else {
      setActivationBtn(false);
    }
  }, [emailValue]);

  const buttonClass = !activationBtn ? classes.disabled : "";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUp({ email: emailValue, password: passwordValue }));
  };

  useEffect(() => {
    if (!isBlock) {
      if (isLoggedIn) {
        navigate("/home");
        isBlock = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <form className={`${classes.form} d-flex`} onSubmit={submitHandler}>
      {!isPasswordShow && (
        <Fragment>
          <RegisterInput
            type="email"
            paragraph="Email address"
            message="Please enter a valid email address"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            hasError={emailHasError}
          />
          <button
            type="button"
            className={`${buttonClass} py-1 px-3 d-flex align-items-center text-capitalize`}
            onClick={getEmailHandler}
            disabled={!activationBtn}
          >
            get ready <IoIosArrowForward />
          </button>
        </Fragment>
      )}
      {isPasswordShow && (
        <Fragment>
          <RegisterInput
            type="password"
            paragraph="Password"
            message="Your password must contain between 1 and 6 characters"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            hasError={passwordHasError}
          />
          <button
            type="submit"
            className="py-1 px-3 d-flex align-items-center text-capitalize"
          >
            get Start <IoIosArrowForward />
          </button>
        </Fragment>
      )}
    </form>
  );
};

export default InputForm;
