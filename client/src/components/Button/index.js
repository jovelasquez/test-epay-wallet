import React from "react";
import Spinner from "../Spinner";

const Botton = (props) => {
  const { loading, children, onClick, block } = props;
  const classes = loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-100";
  const isBlock = block ? "block w-full" : "";
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading}
      className={`btn font-bold py-2 px-4 rounded bg-white text-gray-800 shadow border border-gray-400 inline-flex justify-center ${classes} ${isBlock}`}>
      {loading ? (
        <>
          <Spinner className="w-4 h-4 border-2 border-white rounded-full mr-5" color="#ED8936" />
          <span className="text-gray-500">Procesando...</span>
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Botton;
