// (c) Hussein Kamal
// Created in 2022

import ButtonsContainer from "./ButtonsContainer";

import classes from "./LeftContainer.module.css";

const LeftContainer = (props) => {
  const { singleItem, index, inListPath } = props;

  return (
    <div className={`${classes["left-container"]} d-flex s-4`}>
      <div className={`${classes.left} d-flex flex-column`}>
        <h1 className="text-capitalize">{singleItem.title}</h1>
        <div className="d-flex">
          <time dateTime={singleItem.release}>{singleItem.release}</time>
          <p className={`${classes.type} mx-3 text-capitalize px-1`}>
            {singleItem.type}
          </p>
          <p className="text-capitalize">{singleItem.time}</p>
        </div>
        <div className={classes.breif}>
          <p>{singleItem.breif}</p>
        </div>
        <ButtonsContainer
          singleItem={singleItem}
          index={index}
          inListPath={inListPath}
        />
      </div>
      <div className={classes.right}>
        <img src={singleItem.image} alt={singleItem.title} />
      </div>
    </div>
  );
};

export default LeftContainer;
