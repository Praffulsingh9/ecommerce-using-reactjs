import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./components/Home";
import RegisterLogin from "./components/Register_login";
import Register from "./components/Register_login/Register";
import UserDashboard from "./components/User/index";
import Auth from "./hoc/auth";
import Shop from "./components/Shop";
import ProductPage from "./components/Product";
import AddProduct from "./components/User/Admin/add_product";
import UserCart from "./components/User/cart";
import ManageCategories from "./components/User/Admin/manage_categories";
import UpdateProfile from "./components/User/update_profile";
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path="/user/user_profile"
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductPage, null)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
