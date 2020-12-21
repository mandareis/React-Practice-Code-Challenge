import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {props.allSushi.map((s, i) => {
          return (
            <Sushi
              isEaten={s.isEaten}
              key={i}
              id={s.id}
              name={s.name}
              img_url={s.img_url}
              price={s.price}
              removesSushi={props.removesSushi}
            />
          );
        })}
        <MoreButton handlesMoreSushi={props.handlesMoreSushi} />
      </div>
    </Fragment>
  );
};

export default SushiContainer;
