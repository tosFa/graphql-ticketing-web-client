import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Container from '../layout/container';
import { TextInput, Button } from './elements'


const validate = (values) => {
  let errors = {};

  if (!values.user) {
    errors.text = 'User can\'t be blank'
  }
  if (!values.title) {
    errors.text = 'Title can\'t be blank'
  }

  return errors;
};

export const IssueForm = ({ handleSubmit, onSubmit, }) =>
  <Container>

      <Field
        name="user"
        component={TextInput}
        placeholder="User"
      />
      <Field
        name="title"
        component={TextInput}
        placeholder="Title"
      />

      <Button onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>

  </Container>

export default reduxForm({form: 'issue', validate})(IssueForm);