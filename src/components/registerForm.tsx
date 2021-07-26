import * as React from "react";
import Joi from "joi";
import Form from "./common/form";

export interface RegisterFormProps {
  schemaObject: any;
}

export interface RegisterFormState {}

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: { username: "", password: "", name: "" },
  };

  constructor(props: RegisterFormProps) {
    super(props);
  }

  schemaObject: { [key: string]: any } = {
    username: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  schema = Joi.object(this.schemaObject);

  doSubmit = () => {
    console.log("Registered!!");
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form
          onSubmit={(event: any) => {
            this.handleSubmit(event);
            this.doSubmit();
          }}
        >
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
