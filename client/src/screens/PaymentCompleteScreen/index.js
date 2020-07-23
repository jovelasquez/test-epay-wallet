import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PaymentConfirm } from "../../services";
const queryString = require("query-string");

const PaymentCompleteScreen = (props) => {
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const data = queryString.parse(props.location.search);
  }, [setMessage, setConfirm]);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full px-10">
        <div className="mb-4">
          <div role="alert">
            <div
              className={`border border-${confirm}-400 rounded-b bg-${confirm}-100 px-4 py-3 text-${confirm}-700`}>
              <h1>{message}</h1>
              <Link to="/">Principal</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleteScreen;
