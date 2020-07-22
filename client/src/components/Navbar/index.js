import React from "react";
import MenuLink from "./MenuLink";
import { Container } from "../../components/Container";
import Logo from "../../components/Logo";

const Navbar = () => {
  return (
    <header className="shadow-sm bg-white">
      <div className="bg-blue-300 py-1"></div>
      <Container>
        <nav className="flex items-center justify-between flex-wrap bg-white py-4 mx-auto px-8">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Logo></Logo>
          </div>

          <div className="block lg:hidden">
            <button id="nav-toggle" className="focus:outline-none">
              <div className="h-1 bg-gray-300 w-8 mb-1 block mx-auto rounded-sm"></div>
              <div className="h-1 bg-gray-300 w-8 mb-1 block mx-auto rounded-sm"></div>
              <div className="h-1 bg-gray-300 w-8 mb-1 block mx-auto rounded-sm"></div>
            </button>
          </div>

          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
            id="nav-content">
            <MenuLink activeOnlyWhenExact label="Registrar Usuario" to="/signup" />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
