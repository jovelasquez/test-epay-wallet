import React, { useState } from "react";
import { useField } from "formik";

const CustomField = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);
  const showFeedback = (!!didFocus && field.value && field.value.length > 2) || meta.touched;

  const classError = meta.error ? "border border-red-500" : "border border-green-500";

  const { id } = props;

  return (
    <div className="w-full mb-4 sm:mb-2">
      <div className="flex items-center space-between">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0"
          htmlFor={id}>
          {label}
        </label>
      </div>
      <input
        {...props}
        {...field}
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
          showFeedback ? classError : ""
        }`}
        aria-describedby={`${id}-feedback ${id}-help`}
        onFocus={handleFocus}
      />

      <div className="text-xs" id={`${id}-help`} tabIndex="-1">
        {helpText}
      </div>

      {showFeedback ? (
        <div id={`${id}-feedback`} aria-live="polite" className="text-red-500 text-xs">
          {meta.error ? meta.error : ""}
        </div>
      ) : null}
    </div>
  );
};
export default CustomField;
