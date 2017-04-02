import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Container from '../layout/container';
import { event } from '../../apollo/subscriptions/event';
import { list } from '../../apollo/queries/issue';
import { Link } from 'react-router-dom';

const withData = graphql(list, {
  props: ({ data }) => ({ apollo: data })
});

export class Issues extends Component {

  constructor(props) {
    super(props);

    this.state = {
      issues: []
    };
  }

  componentDidMount() {
    this.subscribe();
  }

  subscribe = () => {
    this.props.apollo.subscribeToMore({
      document: event,
      variables: { group: "ISSUES", types: ['NEW', 'DELETED'], timestamp: +new Date()},
      updateQuery: (previousResult, { subscriptionData }) => {
        const payload = JSON.parse(subscriptionData.data.event.payload);
        this.setState({ issues: [ ...this.state.issues, payload.issue] });
      },
      onError: (err) => console.error(err),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.apollo.loading) {
      this.setState({issues: nextProps.apollo.issues});
    }
  }
  render() {
    if (this.props.apollo.loading) {
      return null;
    }

    const { issues } = this.state;

    return (
      <Container>
        <h1>Issues</h1>
        <ul>
          {issues.map(issue =>
            <li key={issue.uuid}>
              <Link to={`/issue/${issue.uuid}`}>Issue: {issue.uuid} Title: : {issue.title}</Link>
            </li>
          )}
        </ul>
      </Container>
    );
  }
}

export default withData(Issues);
