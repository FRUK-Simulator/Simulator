import React, { FunctionComponent } from "react";
import "./Form.css";

export const TextFormField: FunctionComponent<{
  label: string;
  inputProps?: React.HTMLAttributes<HTMLInputElement>;
}> = ({ label, inputProps = {} }) => {
  return (
    <label className="form-field--label">
      <span className="form-field--label__text">{label}</span>
      <input
        className="form-field--input"
        size={80}
        {...inputProps}
        type="text"
      />
    </label>
  );
};

export const TextAreaFormField: FunctionComponent<{
  label: string;
  inputProps?: React.HTMLAttributes<HTMLTextAreaElement>;
}> = ({ label, inputProps = {} }) => {
  return (
    <label className="form-field--label">
      <span className="form-field--label__text">{label}</span>
      <textarea
        className="form-field--input"
        rows={4}
        cols={80}
        {...inputProps}
      />
    </label>
  );
};
