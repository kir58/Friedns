import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Filter from "./Filter";
import Friend from "./Friend";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Filter} />
      <Route path="/:id" component={Friend} />
    </Router>
  );
};

export default App;
