import gql from 'graphql-tag'

export const create = gql`mutation Token($email: String!, $password: String!, $loginAs: loginAs!){
  token(email: $email, password: $password, loginAs: $loginAs){
    auth_token
  }
}`;
