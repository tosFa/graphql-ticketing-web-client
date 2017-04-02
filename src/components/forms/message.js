import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import Container from '../layout/container';
import { TextInput, Button } from './elements'


const validate = (values) => {
  let errors = {};

  if (!values.text) {
    errors.text = 'Text can\'t be blank'
  }

  return errors;
};

export const MessageForm = ({ handleSubmit, onSubmit, }) =>
  <Container>
    <Field
      name="text"
      component={TextInput}
      placeholder="Text"
    />
    <Button onClick={handleSubmit(onSubmit)}>
      Submit
    </Button>
  </Container>

export default reduxForm({form: 'message', validate})(MessageForm);