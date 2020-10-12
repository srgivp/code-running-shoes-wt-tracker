import React from "react";
import saveCookiesAction from "../../actions/save-cookies-action";
import { requestingData, receivedData } from "../../actions/setToRotation";
export const Login = props => {
  const onClickLogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    props.dispatch(requestingData());
    try {
      let response = await fetch(
        `${process.env.SERVER_URL}/login?email=${email}&password=${password}`
      );
      if (!response.ok) {
        document.getElementById("email").value = null;
        document.getElementById("password").value = null;
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        response = await response.text();
      }
      if (
        response ===
        "Login failed. Check out whether login and/or password are correct"
      ) {
        alert(response);
        props.dispatch(receivedData());
        return;
      } else {
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
    } catch (err) {
      document.getElementById("email").value = null;
      document.getElementById("password").value = null;
      props.dispatch(receivedData());
      alert("Error with logging in:", err.name, err.message);
    }
  };
  return (
    <div id="login">
      <p>Log in to your runner's app account</p>
      <form>
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
