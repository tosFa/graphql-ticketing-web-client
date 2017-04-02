import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import Container from '../layout/container';
import { TextInput, Button, RadioGroup } from './elements'


const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'E-mail can\'t be blank'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid E-mail'
  }
  if (!values.password) {
    errors.password = 'Password can\'t be blank'
  }
  if (!values.loginAs) {
    errors.loginAs = 'Login as can\'t be blank'
  }

  return errors;
};

export const LoginForm = ({ handleSubmit, onSubmit, }) =>
  <Container>
      <h1>Login</h1>
      <Field
        name="email"
        component={TextInput}
        placeholder="Email"
      />
      <Field
        name="password"
        component={TextInput}
        placeholder="Password"
        type="password"
      />
      <Field
        name="loginAs"
        component={RadioGroup}
        options={['admin', 'customer']}
      />
    <Button onClick={handleSubmit(onSubmit)}>
      Submit
    </Button>

  </Container>

export default reduxForm({form: 'login', validate})(LoginForm);