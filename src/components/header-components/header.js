import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {
  InitialLogin,
  onClickInitialLogin,
  onClickCreate,
  onClickDelete
} from "./initial-login";
import "./header.scss";

const Header = () => {
  const originalState = useSelector(state => state);
  const state = JSON.parse(JSON.stringify(originalState));
  const dispatch = useDispatch();
  let userName;
  if (state.currentUser.name) {
    userName = `${state.currentUser.name.toUpperCase()},`;
  } else {
    userName = null;
  }
  return (
    <header>
      <h2>{userName} </h2>
      <h1>Watch Your Shoes!!!</h1>
      <ul>
        <Link to="/">Rotation</Link>
        <Link to="/model">Model</Link>
        <Link to="/substitutes">Substitutes</Link>
        <Link to="/written-off">Written-off</Link>
      </ul>
      <InitialLogin
        onClick={e => {
          onClickInitialLogin(e, dispatch, state);
        }}
        onClickCreate={e => {
          onClickCreate(e, dispatch, state);
        }}
        onClickDelete={e => {
          onClickDelete(e, dispatch, state);
        }}
      />
    </header>
  );
};

export default Header;
