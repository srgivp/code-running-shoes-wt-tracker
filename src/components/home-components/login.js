import React from "react";
import saveCookiesAction from "../../actions/save-cookies-action";
import { requestingData, receivedData } from "../../actions/setToRotation";
export const Login = props => {
  const onClickLogin = async () =>
    /*e,
    email,
    password,
    dispatch,
    model,
    alias,
    lasting*/
    {
      //props.e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      props.dispatch(requestingData());
      let response = await fetch(
        `http://localhost:3000/login?email=${email}&password=${password}`
      );
      if (!response.ok) {
        document.getElementById("email").value = null;
        document.getElementById("password").value = null;
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        response = await response.text();
        console.log("type of cookies", typeof response);
        props.dispatch(saveCookiesAction(response));
        props.dispatch(receivedData());
        alert(
          "You are logged in now. Continue with setting the pair to rotation"
        );
        document.getElementById("email").value = null;
        document.getElementById("password").value = null;
        document.getElementById("login").style.display = "none";
        document.getElementById("model").value = props.model;
        document.getElementById("alias").value = props.alias;
        document.getElementById("lasting").value = props.lasting;
      }
    };
  return (
    <div id="login">
      <p>Log in to your runner's app account</p>
      <form /*action="http://localhost:3000/login" method="post" target="_blanc"*/
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="e-mail"
          required
        ></input>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        ></input>
        <input
          type="submit"
          value="submit"
          onClick={async e => {
            e.preventDefault();
            await onClickLogin();
          }}
        ></input>
      </form>
    </div>
  );
};
