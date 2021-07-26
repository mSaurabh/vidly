import * as React from "react";
import Joi from "joi";
import Input from "./input";
import { iGenre } from "../../services/fakeGenreService";
import Select from "./select";

export interface FormProps {
  schemaObject: any;
  history?: any;
  match?: any;
}

export interface FormState {
  data: any;
  genres?: iGenre[];
  errors: any;
}

class Form extends React.Component<FormProps, FormState> {
  state: FormState = {
    data: {},
    errors: {},
  };

  schemaObject: { [key: string]: any } = this.props.schemaObject;
  schema = Joi.object(this.schemaObject);

  validate = () => {
    const { data } = this.state;
    let errors: any = {};
    const options = { abortEarly: false };

    const { error } = this.schema.validate(data, options);
    //console.log("error :>> ", error);
    if (!error) return null;

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }: { name: string; value: string }) => {
    const obj = { [name]: value };

    const propertySchema = Joi.object({
      [name]: this.schemaObject[name],
    });

    const { error } = propertySchema.validate(obj, { abortEarly: true });
    return error ? error.details[0].message : "";
  };

  handleSubmit = (e?: any) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    this.doSubmit();
  };

  doSubmit = () => {
    console.log("Parent: form.tsx doSubmit");
  };

  handleChange = ({ currentTarget: input }: { currentTarget: any }) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else errors[input.name] = "";

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label: string) {
    return (
      <button
        style={{ marginTop: 10 }}
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  }

  renderInput(
    name: string,
    label: string,
    type: string = "text",
    focused: boolean = false
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name] ? errors[name] : null}
        type={type}
        focused={focused}
      />
    );
  }

  renderDropdown(
    name: string,
    label: string,
    values: iGenre[],
    handleChange: any
  ) {
    const { errors } = this.state;
    const error = errors[name];
    //console.log("values :>> ", values);
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-select"
          id={name}
          style={{ marginBottom: 10 }}
          onChange={handleChange}
        >
          <option defaultValue="">Choose...</option>
          {values.map((value) => {
            return (
              <option key={value._id} value={value.name}>
                {value.name}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }

  renderSelect(name: string, label: string, options: iGenre | any) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
