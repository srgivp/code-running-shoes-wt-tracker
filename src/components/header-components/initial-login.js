import React from "react";
import initialLoginAction from "../../actions/initial-login-action";
import createAccountAction from "../../actions/create-account-action";
import deleteAccountAction from "../../actions/delete-account-action";
import { onClickLogout } from "../nav-bar/logout";

export const onClickInitialLogin = (e, dispatch, state) => {
  e.preventDefault();
  let name = document.querySelector('#initial-login>form>input[name="name"]')
    .value;
  let password = document.querySelector(
    '#initial-login>form>input[name="password"]'
  ).value;

  for (let item of state.users) {
    if (item.name === name) {
      if (item.password !== password) {
        alert("Wrong password!");
        document.querySelector(
          '#initial-login>form>input[name="password"]'
        ).value = null;
        return;
      } else {
        let data = item;
        //console.log(data);
        dispatch(initialLoginAction(data));
        document.querySelector(
          '#initial-login>form>input[name="name"]'
        ).value = null;
        document.querySelector(
          '#initial-login>form>input[name="password"]'
        ).value = null;
        return;
      }
    }
  }
  alert("There is no account with this name");
  document.querySelector('#initial-login>form>input[name="name"]').value = null;
  document.querySelector(
    '#initial-login>form>input[name="password"]'
  ).value = null;
  return;
};

export const onClickCreate = (e, dispatch, state) => {
  e.preventDefault();
  if (state.currentUser.name) {
    onClickLogout(state, dispatch);
  }
  let name = document.querySelector('#initial-login>form>input[name="name"]')
    .value;
  for (let item of state.users) {
    if (item.name === name) {
      alert(
        "Account with this name already exists. To create new account, choose another name."
      );
      document.querySelector(
        '#initial-login>form>input[name="name"]'
      ).value = null;
      document.querySelector(
        '#initial-login>form>input[name="password"]'
      ).value = null;
      return;
    }
  }
  let password = document.querySelector(
    '#initial-login>form>input[name="password"]'
  ).value;
  let data = { name, password };
  dispatch(createAccountAction(data));
  document.querySelector('#initial-login>form>input[name="name"]').value = null;
  document.querySelector(
    '#initial-login>form>input[name="password"]'
  ).value = null;
};

export const onClickDelete = (e, dispatch, state) => {
  e.preventDefault();
  let name = document.querySelector('#initial-login>form>input[name="name"]')
    .value;
  let password = document.querySelector(
    '#initial-login>form>input[name="password"]'
  ).value;
  for (let item of state.users) {
    if (item.name === name) {
      if (item.password === password) {
        if (
          confirm(
            `Are you sure you want to delete account with the name "${name}"?`
          )
        ) {
          const data = { name: item.name, password: item.password };
          dispatch(deleteAccountAction(data));
          document.querySelector(
            '#initial-login>form>input[name="name"]'
          ).value = null;
          document.querySelector(
            '#initial-login>form>input[name="password"]'
          ).value = null;
          alert(
            `Account with user name "${data.name}" was successfully deleted`
          );
          return;
        } else {
          document.querySelector(
            '#initial-login>form>input[name="name"]'
          ).value = null;
          document.querySelector(
            '#initial-login>form>input[name="password"]'
          ).value = null;
          return;
        }
      } else {
        alert("Wrong password!");
        document.querySelector(
          '#initial-login>form>input[name="password"]'
        ).value = null;
        return;
      }
    }
  }
  alert("There is no account with this name");
  document.querySelector('#initial-login>form>input[name="name"]').value = null;
  document.querySelector(
    '#initial-login>form>input[name="password"]'
  ).value = null;
};

const onClickBack = () => {
  document.querySelector('#initial-login>form>input[name="name"]').value = null;
  document.querySelector(
    '#initial-login>form>input[name="password"]'
  ).value = null;
  //sign in btn
  document.querySelector(
    "#initial-login > form > input[type=submit]:nth-child(3)"
  ).style.display = "inline-block";
  //create btn
  document.querySelector(
    "#initial-login > form > input[type=submit]:nth-child(4)"
  ).style.display = "inline-block";
  document.querySelector("#initial-login > div:nth-child(1)").style.display =
    "block";
  document.querySelector("#initial-login > div:nth-child(2)").style.display =
    "none";
  document.getElementById("delete-account-button").style.display = "none";
  document.getElementById("back-btn").style.display = "none";
};

export const InitialLogin = props => {
  return (
    <div className="flex-container">
      <div id="initial-login" style={{ display: "none" }}>
        <div>Please, sign in or create account</div>
        <div>To delete account, enter user name and password</div>
        <form>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="user name"
            required
          ></input>
          <input
            type="password"
            name="password"
            id="init-login-password"
            placeholder="password"
            required
          ></input>
          <input type="submit" value="Sign in" onClick={props.onClick}></input>
          <input
            type="submit"
            value="Create account"
            onClick={props.onClickCreate}
          ></input>
          <input
            id="delete-account-button"
            type="submit"
            value="Delete account"
            onClick={props.onClickDelete}
          ></input>
          <input
            id="back-btn"
            type="submit"
            value="Back"
            onClick={e => {
              e.preventDefault();
              onClickBack();
            }}
          ></input>
        </form>
      </div>
    </div>
  );
};
