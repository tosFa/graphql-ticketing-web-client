import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Container from '../layout/container';
import { create } from '../../apollo/mutations/token';
import LoginForm from '../forms/login'

const mapMutationToProps = graphql(create, {
  props: ({ ownProps, mutate }) => ({
    createAuthToken: ({ email, password, loginAs }) => mutate({ variables: { email, password, loginAs } })
  })
});

export class Login extends Component {
  login = (values) => {
    this.props.createAuthToken(values)
    .then(response => {
      if (response.error) alert('error');

      localStorage.setItem('chat-auth-token', response.data.token.auth_token);
      this.props.push('/issues');
    });
  }

  render() {
    return (
      <Container>
        <LoginForm onSubmit={ this.login } />
      </Container>
    );
  }
}

export default mapMutationToProps(Login);



