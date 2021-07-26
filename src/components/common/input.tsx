import * as React from "react";

export interface InputProps {
  name: string;
  label: string;
  value: any;
  onChange: any;
  type?: string;
  error?: string;
  focused: boolean;
}

const Input = (props: InputProps) => {
  //NOTE We are using ...rest here because the prop and value variable
  //     names where exactly the same
  const { name, label, error, focused, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        style={{ marginBottom: 10 }}
        autoFocus={focused ? true : false}
        id={name}
        name={name}
        {...rest}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
