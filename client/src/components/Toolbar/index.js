import React from "react";
import { Link } from "react-router-dom";
import { WalletIcon } from "../Icons";

const Toolbar = ({ balance }) => {
  return (
    <div className="bg-gray-200 sm:px-2 md:px-6 mb-6">
      <div className="flex flex-row flex-wrap justify-between items-center -mb-px">
        <div className="flex-initial px-2 py-2 m-2">
          <WalletIcon color="white" height="10" width="10" />
        </div>
        <div className="flex-initial text-center px-2 py-2 m-2">
          <h3 className=" tracking-normal text-blue-600 text-lg">$ {balance}</h3>
        </div>
        <div className="flex-grow px-4 py-2 m-2">
          <div className="flex justify-end w-full">
            <Link
              to="/wallet/recharge"
              className="sm:w-auto block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
              Recargar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
