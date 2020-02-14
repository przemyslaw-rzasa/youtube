import * as React from "react";
import { cloneDeep, pick } from "lodash";

import { authorize, unauthorizedFetch } from "../services/http/http";
import { Modal } from "../components/User/Modal/Modal";
import { Form } from "../components/User/Form/Form";

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

export const Page = (props: any) => {
  const initialFormState = {
    [FormKeys.EMAIL]: "",
    [FormKeys.PASSWORD]: "",
    [FormKeys.REPEATED_PASSWORD]: ""
  };

  const initialFormType = FormType.LOGIN;

  // State of auth form
  const [formState, setFormState] = React.useState(cloneDeep(initialFormState));

  const setFormValue = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const resetFormData = () => setFormState(cloneDeep(initialFormState));

  // Type of auth Form
  const [formType, setFormType] = React.useState(initialFormType);
  const resetFormType = () => setFormType(initialFormType);

  // Reset whole form
  const resetForm = () => {
    resetFormData();
    resetFormType();
  };

  // Prevent data loss checkers
  const isAnyInputFilled = () => {
    const requiredKeys =
      formType === FormType.LOGIN
        ? LOGIN_REQUIRED_KEYS
        : REGISTER_REQUIRED_KEYS;

    const partialFormState = pick(formState, requiredKeys);

    return !!Object.values(partialFormState).join("").length;
  };

  const onBackdropClick = () => {
    const leaveModal = () => {
      resetFormData();
      resetFormType();

      // youtubeContext.callbacks.toggleAuthModal(false);
    };

    if (isAnyInputFilled()) {
      const proceed = window.confirm(
        "Data you've entered won't be saved. Confirm to proceed"
      );

      if (proceed) {
        leaveModal();
      }
    } else {
      leaveModal();
    }
  };

  // User auth
  const authUser = async () => {
    try {
      await authorize(formState.email, formState.password);

      // youtubeContext.callbacks.toggleAuthModal(false);

      resetForm();

      // youtubeContext.callbacks.onAuthSucceed();
    } catch (e) {
      alert(e);
    }
  };

  // User register
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
