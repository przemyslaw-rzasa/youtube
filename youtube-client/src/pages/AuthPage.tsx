import * as React from "react";
import { cloneDeep, pick } from "lodash";

import { YoutubeContext } from "../YoutubeContext";
import { authorize, unauthorizedFetch } from "../services/http/http";
import { Modal } from "../components/Auth/Modal/Modal";
import { Form } from "../components/Auth/Form/Form";

export enum FormKeys {
  EMAIL = "email",
  PASSWORD = "password",
  REPEATED_PASSWORD = "repeatedPassword"
}

export enum FormType {
  LOGIN = "login",
  REGISTER = "register"
}

const LOGIN_REQUIRED_KEYS = [FormKeys.EMAIL, FormKeys.PASSWORD];

const REGISTER_REQUIRED_KEYS = [
  FormKeys.EMAIL,
  FormKeys.PASSWORD,
  FormKeys.REPEATED_PASSWORD
];

export const Page = () => {
  const context = React.useContext(YoutubeContext);

  const initialFormState = {
    [FormKeys.EMAIL]: "",
    [FormKeys.PASSWORD]: "",
    [FormKeys.REPEATED_PASSWORD]: ""
  };

  const resetFormData = () => setFormState(cloneDeep(initialFormState));
  const resetFormType = () => setFormType(initialFormType);

  const resetForm = () => {
    resetFormData();
    resetFormType();
  };

  const initialFormType = FormType.LOGIN;

  const [formState, setFormState] = React.useState(cloneDeep(initialFormState));

  const [formType, setFormType] = React.useState(initialFormType);

  const setFormValue = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const isAnyInputFilled = () => {
    const requiredKeys =
      formType === FormType.LOGIN
        ? LOGIN_REQUIRED_KEYS
        : REGISTER_REQUIRED_KEYS;

    const partialFormState = pick(formState, requiredKeys);

    return !!Object.values(partialFormState).join("").length;
  };

  const leave = () => {
    context.toggleAuthPage(false);

    resetForm();
  };

  const onBackdropClick = () => {
    if (isAnyInputFilled()) {
      const proceed = window.confirm(
        "Data you've entered won't be saved. Confirm to proceed"
      );

      if (proceed) {
        leave();
      }
    } else {
      leave();
    }
  };

  const authUser = async () => {
    try {
      await authorize(formState.email, formState.password);

      context.onAuthSucceed();

      leave();
    } catch (e) {
      alert(e);
    }
  };

  const createUser = async () => {
    const { email, password, repeatedPassword } = formState;

    if (password !== repeatedPassword) {
      return alert("Passwords incompatibility");
    }

    try {
      await unauthorizedFetch("/users", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      await authUser();
    } catch (e) {
      alert(e);
    }
  };

  const onSubmitClick = async () => {
    if (formType === FormType.LOGIN) {
      return await authUser();
    }

    return await createUser();
  };

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <Form
        formState={formState}
        setFormValue={setFormValue}
        formType={formType}
        setFormType={setFormType}
        onSubmitClick={onSubmitClick}
      />
    </Modal>
  );
};
