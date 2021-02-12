import { FORM_ERROR } from "final-form";
import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import { useThunkDispatch } from "../..";
import { registerUser } from "../../actions/user/register";
import { ErrorMessage } from "../../app/common/form/ErrorMessage";
import { TextInput } from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";

const validate = combineValidators({
  username: isRequired("username"),
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password"),
});

export const RegisterForm = () => {
  const dispatcher = useThunkDispatch();
  return (
    
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        dispatcher(registerUser(values)).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center'/>
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field name="displayName" component={TextInput} placeholder="Display Name" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error = {submitError} text = ''/>
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit)|| pristine}
            loading={submitting}
            color ='teal'
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};
