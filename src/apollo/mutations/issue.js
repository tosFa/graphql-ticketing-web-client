import gql from 'graphql-tag'

export const create = gql`mutation Issue($title: String!, $customerUuid: ID!){
  issue(title: $title, customerUuid: $customerUuid){
    uuid
  }
}`;
export const remove = gql`mutation deleteIssue($uuid: ID!){
  deleteIssue(uuid: $uuid){
    success
  }
}`;
