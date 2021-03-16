import { FORM_ERROR } from "final-form";
import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import { useThunkDispatch } from "../..";
import { loginUser } from "../../actions/user/login";
import { ErrorMessage } from "../../app/common/form/ErrorMessage";
import { TextInput } from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

export const LoginForm = () => {
  const dispatch = useThunkDispatch();
  return (
    
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        dispatch(loginUser(values)).catch((error) => ({
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
          <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error = {submitError} text = 'Invalid email or password'/>
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit)|| pristine}
            loading={submitting}
            color ='teal'
            content="Login"
          />
        </Form>
      )}
    />
  );
};
