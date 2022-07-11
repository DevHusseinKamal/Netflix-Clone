import classes from "./RightContainer.module.css";

const itemStyles = "d-flex flex-column";
const txtCapitalize = "text-capitalize";

const RightContainer = ({ singleItem }) => {
  const director = singleItem.details[0].director;

  const casts = singleItem.details[1].cast.map((detail, index) => {
    return <p key={index}>{detail}</p>;
  });

  const writters = singleItem.details[2].writters.map((writter, index) => {
    return <p key={index}>{writter}</p>;
  });

  const rating = singleItem.maturityRatings;

  return (
    <div
      className={`${classes["right-container"]} d-flex ps-5 ${txtCapitalize}`}
    >
      <div className={itemStyles}>
        <h4>director</h4>
        <p>{director}</p>
        <h4>cast</h4>
        {casts}
      </div>
      <div className={itemStyles}>
        <h4>writers</h4>
        {writters}
      </div>
      <div className={itemStyles}>
        <h4>geners</h4>
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default RightContainer;
