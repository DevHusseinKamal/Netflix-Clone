// (c) Hussein Kamal
// Created in 2022

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../components/hooks/use-form";

import { login } from "../../components/Auth/Auth";
import LoginInput from "./LoginInput";

import logo from "../../components/assets/Netflix-Logo.png";

import classes from "./Login.module.css";

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email: emailValue, password: passwordValue }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      className={`${classes.login} d-flex justify-content-center align-items-center`}
    >
      <Link to="/register">
        <img src={logo} alt="Netflix Logo" />
      </Link>
      <form className={classes.card} onSubmit={submitHandler}>
        <div className={classes.wrapper}>
          <h2 className="text-capitalize mt-5 mb-4">sign in</h2>
          <LoginInput
            type="email"
            paragraph="Email"
            message="Please enter a valid email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            hasError={emailHasError}
          />
          <br />
          <br />
          <LoginInput
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
            className={`${classes.sumbit} p-2 fw-bold mt-5 text-capitalize`}
          >
            sign in
          </button>
          <div className={`${classes.signup} mt-3 d-flex`}>
            <p className="me-1">New to Netflix?</p>
            <Link to="/register">Sign up now.</Link>
          </div>
          <p className={classes.captcha}>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <span>Learn more.</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
