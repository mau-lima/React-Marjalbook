import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

export const TextInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}: IProps) => {
  return (
    <Form.Field error={touched && !!error} width ={width}>
      <input {...input} placeholder={placeholder} type="text" />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
// {...input} is a destructuring provides the onChange, onBlur, etc handlers.
