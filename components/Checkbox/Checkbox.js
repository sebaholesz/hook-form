import React from "react";
import { CheckboxStyled } from "./Checkbox.style.js";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const Checkbox = ({ label, required, name }) => {
  const { register, formState } = useFormContext();

  return (
    <CheckboxStyled>
      <div className="checkbox-wrapper">
        <input
          {...register(name)}
          className={
            formState.errors[name] && formState.touchedFields[name]
              ? "error checkbox"
              : "checkbox"
          }
          type="checkbox"
        />
        <label>
          {label}
          {required && <b>*</b>}
        </label>
      </div>
      <div className="error-box">
        <ErrorMessage
          errors={formState.errors}
          name={name}
          render={({ message }) => (
            <span className="error-message">{message}</span>
          )}
        />
      </div>
    </CheckboxStyled>
  );
};

export default Checkbox;
