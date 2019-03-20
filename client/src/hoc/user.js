import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    name: "My Account",
    linkto: "/user/dashboard"
  },
  {
    name: "User Information",
    linkto: "/user/user_profile"
  },
  {
    name: "My Cart",
    linkto: "/user/cart"
  }
];

const UserLayout = props => {
  const generateLinks = links =>
    links.map((link, i) => (
      <Link to={link.linkto} key={i}>
        {link.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">{generateLinks(links)}</div>
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
