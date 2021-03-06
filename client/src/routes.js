import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PageLayoutRoute from "./layouts/Pages";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import WalletRechargeScreen from "./screens/WalletRechargeScreen";

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <PageLayoutRoute exact path="/" component={HomeScreen} />
      <PageLayoutRoute exact path="/signup" component={SignupScreen} />
      <PageLayoutRoute exact path="/wallet/recharge" component={WalletRechargeScreen} />
    </Switch>
  </Router>
);

export default Routes;
