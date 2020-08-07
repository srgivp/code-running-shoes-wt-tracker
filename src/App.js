import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.scss";
import Home from "./components/home";
import Model from "./components/the-model";
import Substitutes from "./components/substitutes";
import WrittenOff from "./components/written-off";
import Header from "./components/header-components/header";
import NavBar from "./components/nav-bar/nav-bar";

const App = () => {
  const state = useSelector(state => state);
  useEffect(() => {
    if (state.requestingData) {
      document.getElementById("spinner").style.display = "block";
    } else {
      document.getElementById("spinner").style.display = "none";
    }
  }, [state.requestingData]);
  return (
    <Router /*basename={process.env.PUBLIC_URL}*/>
      <div>
        <i id="spinner" className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
      <NavBar />
      <Header />
      <Switch>
        <Route path="/running-shoes-tracker/" exact component={Home} />
        <Route path="/running-shoes-tracker/model" exact component={Model} />
        <Route
          path="/running-shoes-tracker/substitutes"
          exact
          component={Substitutes}
        />
        <Route
          path="/running-shoes-tracker/written-off"
          exact
          component={WrittenOff}
        />
      </Switch>
      <div id="below-root">
        <p id="attribution">
          &#169; Developed, designed and coded by Sergii Popravka
        </p>
      </div>
    </Router>
  );
};

export default App;
