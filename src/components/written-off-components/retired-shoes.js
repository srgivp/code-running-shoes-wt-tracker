import React from "react";
import { useSelector, useDispatch } from "react-redux";
import deleteItem from "../../actions/delete-item";
import putBackAction from "../../actions/put-back-action";
import { reversedDate } from "../../actions/setToRotation";
import "./retired.scss";

const RetiredPair = props => {
  return (
    <div
      className="row grid-container retired-grid-container"
      id={props.id}
      onClick={props.onClick}
    >
      <div className="col col-model">
        <p>{props.model}</p>
        <div className="row">
          <div className="btn delete-item">delete</div>
          <div className="btn back-to-rotation">put back to rotation</div>
        </div>
      </div>
      <div className="col" title="Distance done up to the date of writing off">
        {props.distanceOnRetirement}
      </div>
      <div className="col">{props.retirementDate}</div>
      <div className="col">
        {Math.floor(
          (Date.parse(reversedDate(props.retirementDate)) -
            props.startingDate) /
            86400000
        )}
      </div>
    </div>
  );
};

const ShoesGrid = () => {
  const dispatch = useDispatch();
  let state = useSelector(state => state);
  const onClickPutBack = (targetClass, currentTargetId) => {
    if (targetClass === "btn back-to-rotation") {
      dispatch(putBackAction(currentTargetId));
    } else {
      return;
    }
  };
  if (state.currentUser.shoes.length > 0) {
    let shoes = state.currentUser.shoes.map(item => {
      if (item.retired === "true") {
        return (
          <RetiredPair
            key={item.alias}
            id={item.alias}
            model={item.model}
            distanceOnRetirement={item.distanceOnRetirement}
            retirementDate={item.retirementDate}
            startingDate={item.date}
            onClick={e => {
              const btnTargetClass = e.target.className;
              const btnCurrentTargetId = e.currentTarget.id;
              onClickPutBack(btnTargetClass, btnCurrentTargetId);
              dispatch(deleteItem(btnTargetClass, btnCurrentTargetId));
            }}
          />
        );
      }
    });
    if (shoes.length > 0) {
      return shoes;
    } else {
      return "There is no retired shoes yet";
    }
  } else {
    return "There is no retired shoes yet";
  }
};

const RetiredShoes = () => {
  return (
    <div id="shoes-grid-retired" className="section-container">
      <div className="grid-caption">
        <h3>Retired shoes</h3>
      </div>
      <div className="row header grid-container retired-grid-container">
        <div className="col">model</div>
        <div className="col">distance done</div>
        <div className="col">retired on</div>
        <div className="col">days in rotation</div>
      </div>
      <ShoesGrid />
    </div>
  );
};

export default RetiredShoes;
