import React, { useState, useEffect } from "react";
import { PaymentConfirm } from "../../services";

const PaymentCompleteScreen = (props) => {
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    PaymentConfirm(props.location.search)
      .then((response) => response.json())
      .then((data) => {
        console.log("response...", data);
        setConfirm(data.code == "200" ? "green" : "red");
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setMessage, setConfirm]);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full px-10">
        <div className="mb-4">
          <div role="alert">
            <div
              className={`border border-${confirm}-400 rounded-b bg-${confirm}-100 px-4 py-3 text-${confirm}-700`}>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleteScreen;
