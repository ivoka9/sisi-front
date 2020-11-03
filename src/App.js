import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";

import MainView from "./Components/UserPannel/MainView";
import SingleCard from "./Components/UserPannel/SingleCard";
import PlaceOrder from "./Components/UserPannel/PlaceOrder";
import AdminMainView from "./Components/AdminPannel/AdminMainView";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <MainView admin={false} />}
        ></Route>
        <Route exact path="/admin" component={AdminMainView}></Route>
        <Route path="/order/:id" component={PlaceOrder}></Route>
        <Route path="/:id" component={SingleCard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
