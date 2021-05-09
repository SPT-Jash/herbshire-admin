import React, { useContext, useState } from "react";
import "./sidenav.css";
import logo from "../../Logo.png";
import { MdDashboard } from "react-icons/md";
import { GrCube, GrDeliver } from "react-icons/gr";
import { FaCube, FaRegUser, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Context } from "../Data/Context";

export default function Sidenav() {
  const { selectedNavItem, setSelectedNavItem } = useContext(Context);
  const { auth } = useContext(Context);
  const [orderIconClassName, setOrderIconClassName] = useState(
    "side-nav-content"
  );
  const [deliveryIconClassName, setDeliveryIconClassName] = useState(
    "side-nav-content"
  );
  const OrderIconHoverColor = () => {
    setOrderIconClassName("side-nav-content side-nav-icon-hover");
  };
  const OrderIconNormalColor = () => {
    setOrderIconClassName("side-nav-content");
  };
  const DeliveryIconHoverColor = () => {
    setDeliveryIconClassName("side-nav-content side-nav-icon-hover");
  };
  const DeliveryIconNormalColor = () => {
    setDeliveryIconClassName("side-nav-content");
  };

  if (!auth) {
    return (
      <div className="sidenav">
        <a className="side-nav-title" href="#about">
          {" "}
          <img src={logo} /> <div>Herb</div>Shire
        </a>
        <NavLink
          className={"side-nav-content side-nav-content-selected"}
          to="/"
        >
          <MdDashboard /> Login
        </NavLink>
      </div>
    );
  }

  return (
    <div className="sidenav">
      <a className="side-nav-title" href="#about">
        {" "}
        <img src={logo} /> <div>Herb</div>Shire
      </a>

      <NavLink
        className={
          selectedNavItem === "dashboard"
            ? "side-nav-content side-nav-content-selected"
            : "side-nav-content"
        }
        to="/"
        onClick={() => {
          setSelectedNavItem("dashboard");
        }}
      >
        <MdDashboard /> Dashboard
      </NavLink>
      <NavLink
        className={
          selectedNavItem === "orders"
            ? "side-nav-content side-nav-content-selected side-nav-icon-selected"
            : orderIconClassName
        }
        onMouseEnter={OrderIconHoverColor}
        onMouseLeave={OrderIconNormalColor}
        onClick={() => {
          setSelectedNavItem("orders");
        }}
        to="/orders"
      >
        <GrCube /> Orders
      </NavLink>
      <NavLink
        className={
          selectedNavItem === "subscription"
            ? "side-nav-content side-nav-content-selected side-nav-icon-selected"
            : "side-nav-content"
        }
        onClick={() => {
          setSelectedNavItem("subscription");
        }}
        to="/subscription"
      >
        <FaCube /> Subscription
      </NavLink>
      <NavLink
        className={
          selectedNavItem === "deliveries"
            ? "side-nav-content side-nav-content-selected side-nav-icon-selected"
            : deliveryIconClassName
        }
        onMouseEnter={DeliveryIconHoverColor}
        onMouseLeave={DeliveryIconNormalColor}
        onClick={() => {
          setSelectedNavItem("deliveries");
        }}
        to="/deliveries"
      >
        <GrDeliver /> Deliveries
      </NavLink>
      <NavLink
        className={
          selectedNavItem === "customers"
            ? "side-nav-content side-nav-content-selected"
            : "side-nav-content"
        }
        onClick={() => {
          setSelectedNavItem("customers");
        }}
        to="/customers"
      >
        <FaRegUser /> Customers
      </NavLink>
      <NavLink
        className={
          selectedNavItem === "products"
            ? "side-nav-content side-nav-content-selected"
            : "side-nav-content"
        }
        onClick={() => {
          setSelectedNavItem("products");
        }}
        to="/products"
      >
        <FaShoppingCart /> Products
      </NavLink>
    </div>
  );
}
