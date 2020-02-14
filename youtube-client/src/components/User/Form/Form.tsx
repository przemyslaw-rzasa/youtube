import * as React from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button
} from "@material-ui/core";

import { FormKeys, FormType } from "../../../pages/AuthPage";

import "./Form.scss";

export const Form = ({
  formState,
  setFormValue,
  formType,
  setFormType,
  onSubmitClick
}: any) => {
  const BASE_CLASS = "auth-form";

  const onInputChange = (key: string) => (e: any) =>
    setFormValue(key, e.target.value);

  const emailFormControl = (
    <FormControl>
      <InputLabel htmlFor="email-input">Email address</InputLabel>
      <Input
        id="email-input"
        value={formState[FormKeys.EMAIL]}
        onChange={onInputChange(FormKeys.EMAIL)}
      />
    </FormControl>
  );

  const passwordFormControl = (
    <FormControl>
      <InputLabel htmlFor="password-input">Password</InputLabel>
      <Input
        id="password-input"
        type="password"
        required
        value={formState[FormKeys.PASSWORD]}
        onChange={onInputChange(FormKeys.PASSWORD)}
      />
    </FormControl>
  );

  const repeatedPasswordFormControl = (
    <FormControl>
      <InputLabel htmlFor="password-input">Repeat password</InputLabel>
      <Input
        id="password-input"
        type="password"
        required
        value={formState[FormKeys.REPEATED_PASSWORD]}
        onChange={onInputChange(FormKeys.REPEATED_PASSWORD)}
      />
    </FormControl>
  );

  const loginForm = (
    <FormGroup>
      {emailFormControl}
      {passwordFormControl}
    </FormGroup>
  );

  const registerForm = (
    <FormGroup>
      {emailFormControl}
      {passwordFormControl}
      {repeatedPasswordFormControl}
    </FormGroup>
  );

  const form = formType === FormType.LOGIN ? loginForm : registerForm;

  const onFormSwitchClick = () =>
    setFormType(
      formType === FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN
    );

  const formSwitchButton = (
    <Button
      className={`${BASE_CLASS}__switch-button`}
      onClick={onFormSwitchClick}
    >
      <Typography color="primary" variant="caption">
        {formType === FormType.LOGIN
          ? "Do not have an account yet?"
          : "Have an account already?"}
      </Typography>
    </Button>
  );

  const actionText = formType === FormType.LOGIN ? "Login" : "Register";

  const header = <Typography variant="h6">{actionText}</Typography>;

  const submit = (
    <Button
      color="default"
      variant="contained"
      size="small"
      className={`${BASE_CLASS}__action-button`}
      onClick={onSubmitClick}
    >
      {actionText}
    </Button>
  );

  return (
    <div className={BASE_CLASS}>
      {header}
      {form}
      {submit}
      {formSwitchButton}
    </div>
  );
};
