import React, { useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Orders from "./Pages/Order";
import Customers from "./Pages/Customers";
import Delivries from "./Pages/Delivries";
import Products from "./Pages/Products";
import AddProducts from "./Pages/AddProducts";
import Subscription from "./Pages/Subscription";
import Login from "./Pages/Login";
import { Context } from "./Data/Context";
export default function Routes() {
  const { auth } = useContext(Context);

  if (!auth) {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/orders" component={Orders} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/deliveries" component={Delivries} />
        <Route path="/customers" component={Customers} />
        <Route path="/products" exact component={Products} />
        <Route path="/add-products" component={AddProducts} />
        <Route path="/update-product" component={AddProducts} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    );
  }
}
