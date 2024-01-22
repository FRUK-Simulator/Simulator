import React, { FunctionComponent, HTMLAttributes } from "react";
import "./Form.css";

export const TextFormField: FunctionComponent<{
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
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

interface IOption<T> {
  key: string;
  value: T;
  label: string;
  optionProps?: HTMLAttributes<HTMLOptionElement>;
}

type SelectFieldProps<T extends unknown> = {
  label: string;
  options: IOption<T>[];
  onChange: (selectedOption: IOption<T> | undefined) => void;
  selectedOption?: IOption<T>;
};

export function SelectField<T>({
  label,
  onChange,
  options,
  selectedOption,
}: SelectFieldProps<T>) {
  return (
    <label className="form-field--label">
      <span className="form-field--label__text">{label}</span>
      <select
        className="form-field--input form-field--select"
        value={selectedOption?.key}
        onChange={(evt) => {
          const selectedOption = options.find(
            (o) => o.key === evt.target.value,
          );
          onChange(selectedOption);
        }}
      >
        {options.map(({ key, label, optionProps }) => {
          return (
            <option
              {...optionProps}
              key={key}
              value={key}
              className="form-field--select__option"
            >
              {label}
            </option>
          );
        })}
      </select>
    </label>
  );
}
