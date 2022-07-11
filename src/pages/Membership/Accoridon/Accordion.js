// (c) Hussein Kamal
// Created in 2022

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { accordionData } from "./accordion-data";

import classes from "./Accordion.module.css";

const Accordion = () => {
  const [accordionId, setAccordionId] = useState(null);
  const [elmMaxHeight, setElmMaxHeight] = useState(null);

  const accordionHandler = (id, e) => {
    const icons = document.querySelectorAll(".plus");
    if (id === accordionId) {
      setAccordionId(null);
      setElmMaxHeight(null);

      e.currentTarget.children[0].classList.remove(classes.rotate);
      return;
    }

    setAccordionId(id);
    setElmMaxHeight(e.target.closest("button").nextElementSibling.scrollHeight);

    icons.forEach((icon) => icon.classList.remove(classes.rotate));
    e.currentTarget.children[0].classList.add(classes.rotate);
  };

  const setAccData = accordionData.map((item, index) => {
    return (
      <li key={item.id} className={`${classes.list} mb-2`}>
        <button
          onClick={accordionHandler.bind(null, item.id)}
          className="d-flex justify-content-between align-items-center py-3 px-5"
        >
          {item.head} <AiOutlinePlus className="plus" />
        </button>
        <div
          className={classes.desc}
          style={{
            maxHeight: accordionId === index + 1 ? `${elmMaxHeight}px` : null,
          }}
        >
          <p className="py-4 px-5">{item.des}</p>
        </div>
      </li>
    );
  });

  return (
    <div className={`${classes.accordion} container-fluid py-5`}>
      <div className="row">
        <div className={`${classes.wrapper} col-lg-9 col-md-10 col-sm-12`}>
          <h1 className="text-center mb-5 text-capitalize">
            frequently asked questions
          </h1>
          <ul>{setAccData}</ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
