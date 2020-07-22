import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="text-white no-underline hover:text-white hover:no-underline pl-2">
      <div className="h-8 bg-gray-300 w-16 block mx-auto rounded"></div>
    </Link>
  );
};

export default Logo;
