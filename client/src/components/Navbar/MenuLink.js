import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link
      to={to}
      className={`"block mt-4 lg:inline-block lg:mt-0 hover:text-orange-500 mr-6 ml-6 font-thin" ${
        match ? "text-orange-500" : "text-gray-700"
      }`}>
      {label}
    </Link>
  );
};

export default MenuLink;
