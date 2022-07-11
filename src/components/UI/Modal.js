// (c) Hussein Kamal
// Created in 2022

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { netflixActions } from "../store/netflix-slice";
import logo from "../assets/Netflix-Logo.png";

import { FaPlay } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import { CgFileRemove } from "react-icons/cg";
import { RiArrowGoBackFill } from "react-icons/ri";

import classes from "./Modal.module.css";

const flexBox = "d-flex align-items-center";
const txtCapitalize = "text-capitalize";

const Modal = ({ index, setModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const items = useSelector((state) => state.netflix.objectsDetails);
  const singleItem = items[index];

  const watchHandler = () => {
    document.body.style.overflowY = "scroll";
    navigate("/watch");
  };

  const addToListHandler = (id) => {
    dispatch(netflixActions.setListHandler({ id, index }));
  };

  const removeFromListHandler = (id) => {
    if (location.pathname === "/my-list") {
      setModal(false);
    }

    dispatch(netflixActions.removeItemfromList({ id, index }));
    document.body.style.overflowY = "scroll";
  };

  const closeModalHandler = () => {
    setModal(false);
    dispatch(netflixActions.clearUniqueObject());

    document.body.style.overflowY = "scroll";
  };

  return (
    <div className={classes.modal}>
      <nav className={`${flexBox} justify-content-center`}>
        <img src={logo} alt="Netflix logo" />
      </nav>
      <div className={classes["modal-item"]}>
        <img src={singleItem.image} alt={singleItem.title} />
        <div
          className={`${classes.container} ${flexBox} ${txtCapitalize} flex-column`}
        >
          <h2 className="text-center">{singleItem.title}</h2>
          <div className="d-flex m-auto">
            <p>{singleItem.release}</p>
            <p className={`${classes.type} mx-3 px-1`}>{singleItem.type}</p>
            <p>{singleItem.time}</p>
          </div>
        </div>
        <div className={`${classes.watch} my-3 mx-5 d-flex`}>
          <button
            type="button"
            className={`${txtCapitalize} py-3`}
            onClick={watchHandler}
          >
            <FaPlay className="me-2" /> play
          </button>
          <button
            type="button"
            onClick={addToListHandler.bind(null, singleItem.id)}
            disabled={singleItem.inList}
            className={`${
              singleItem.inList ? classes.check : ""
            } ${txtCapitalize}`}
          >
            {!singleItem.inList ? (
              <MdOutlineAdd className="me-2" />
            ) : (
              <BiCheck className="me-2" />
            )}{" "}
            my list
          </button>
          {singleItem.inList && (
            <button
              type="button"
              onClick={removeFromListHandler.bind(null, singleItem.id)}
            >
              <abbr title="Remove from list">
                <CgFileRemove />
              </abbr>
            </button>
          )}
        </div>
        <button
          type="button"
          className={`${classes.back} ${txtCapitalize} py-4`}
          onClick={closeModalHandler}
        >
          <RiArrowGoBackFill /> back to browse
        </button>
      </div>
    </div>
  );
};

export default Modal;
