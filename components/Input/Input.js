import React from "react";
import { InputStyled } from "./Input.style.js";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const Input = ({ label, required, name }) => {
  const { register, formState } = useFormContext();
  return (
    <InputStyled>
      <label>
        {label}
        {required && <b>*</b>}
      </label>
      <input
        {...register(name)}
        className={
          formState.errors[name] && formState.touchedFields[name] ? "error" : ""
        }
      />
      <div className="error-box">
        <ErrorMessage
          errors={formState.errors}
          name={name}
          render={({ message }) => (
            <span className="error-message">{message}</span>
          )}
        />
      </div>
    </InputStyled>
  );
};

export default Input;
