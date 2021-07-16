import React from "react";
import { RadioGroupStyled } from "./RadioGroup.style.js";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const RadioGroup = ({ label, required, options, name }) => {
  const { register, formState } = useFormContext();

  return (
    <RadioGroupStyled>
      <label>
        {label}
        {required && <b>*</b>}
      </label>
      <div className="radio-options">
        {options.map(({ label, value }) => (
          <div key={value} className="option">
            <input name={name} value={value} type="radio" {...register(name)} />
            <label>{label}</label>
          </div>
        ))}
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
    </RadioGroupStyled>
  );
};

export default RadioGroup;
