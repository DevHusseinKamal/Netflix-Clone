// (c) Hussein Kamal
// Created in 2022

import { useRef, useState } from "react";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const ListWrapper = ({ listProps, insertedData, classes }) => {
  let currentRef = useRef(0);
  const containerRef = useRef();

  const [isShowPrevBtn, setIsShowPrevBtn] = useState(false);
  const [isShowBtns, setIsShowBtns] = useState(false);

  const alignDisplays = () => {
    return currentRef.current >= listProps.data.length - 2;
  };

  const slideControl = (operator) => {
    if (operator === "+") {
      currentRef.current++;
    } else {
      currentRef.current--;
    }

    containerRef.current.style =
      "transform: translateX(-" + 250 * currentRef.current + "px)";
  };

  const nextSlideHandler = () => {
    if (alignDisplays()) {
      return;
    }

    setIsShowPrevBtn(true);
    slideControl("+");
  };

  const showPrevBtn = () => {
    if (currentRef.current === 1) {
      setIsShowPrevBtn(false);
    }
  };

  const prevSlideHandler = () => {
    showPrevBtn();
    if (currentRef.current <= 0) {
      return;
    }

    slideControl("-");
  };

  const showNextBtnHandler = () => {
    setIsShowBtns(true);
  };

  const hideNextBtnHandler = () => {
    setIsShowBtns(false);
  };

  return (
    <div
      className={`${classes.wrapper} ms-5`}
      onMouseEnter={showNextBtnHandler}
      onMouseLeave={hideNextBtnHandler}
    >
      <div className={classes["btns-control"]}>
        {isShowPrevBtn && isShowBtns && (
          <button
            type="button"
            className={classes.left}
            onClick={prevSlideHandler}
          >
            <IoIosArrowBack />
          </button>
        )}
        {isShowBtns && (
          <button
            type="button"
            className={classes.right}
            onClick={nextSlideHandler}
          >
            <IoIosArrowForward />
          </button>
        )}
      </div>
      <h4>{listProps.title}</h4>
      <div className={classes.container} ref={containerRef}>
        {insertedData}
      </div>
    </div>
  );
};

export default ListWrapper;
