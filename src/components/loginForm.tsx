import React, { Component } from "react";
import Input from "../components/common/input";
import Joi from "joi";
import Form from "./common/form";

export interface LoginFormProps {
  schemaObject: any;
}

export interface LoginFormState {
  data: iUserInfo;
  errors?: iErrorInfo;
}
export interface iFormInputs {
  [key: string]: string | undefined;
}
export interface iErrorInfo extends iFormInputs {
  username?: string;
  password?: string;
}

export interface iUserInfo extends iFormInputs {
  username: string;
  password: string;
}

//class LoginForm extends Component<LoginFormProps, LoginFormState> {
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: { username: "", password: "" },
  };

  constructor(props: LoginFormProps) {
    super(props);
  }

  schemaObject: { [key: string]: any } = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  schema = Joi.object(this.schemaObject);

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form
          onSubmit={(event: any) => {
            this.handleSubmit(event);
            this.doSubmit();
          }}
        >
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
