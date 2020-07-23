import React from "react";
import Spinner from "../Spinner";

const Botton = (props) => {
  const { loading, disabled, children, onClick, block } = props;
  const classes = loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-100";
  const isBlock = block ? "block w-full" : "";
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading || !!disabled}
      className={`btn font-bold py-2 px-4 rounded bg-white text-gray-800 shadow border border-gray-400 inline-flex justify-center ${classes} ${isBlock}`}>
      {loading ? (
        <Spinner className="w-6 h-6 border-2 border-white rounded-full" color="#ED8936" />
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </button>
  );
};

export default Botton;
