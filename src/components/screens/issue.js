import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Container from '../layout/container';
import { event } from '../../apollo/subscriptions/event';
import { create } from '../../apollo/mutations/message';
import { list as messages } from '../../apollo/queries/message';
import { entity } from '../../apollo/queries/issue';
import MessageForm from '../forms/message'

const withData = graphql(entity, {
  props: ({ data, match }) => ({
    apollo: data,
    loadMoreEntries(lastItem = '') {
      return data.fetchMore({
        query: messages,
        variables: { issueUuid: data.issue.uuid, limit: 30, lastItem },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) {
            return previousResult;
          }
          return fetchMoreResult;
        },
      });
    },
  }),
  options: (props) => ({ variables: { uuid: props.match.params.uuid, limit: 30 } }),
});


const withMutation = graphql(create, {
  props: ({ ownProps, mutate }) => ({
    createMessage: ({ text }) => mutate({ variables: { text, issueUuid: ownProps.match.params.uuid } })
  })
});

export class Issue extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: [] };
  }

  componentDidMount() {
    const uuid = this.props.match.params.uuid;

    this.subscription = this.props.apollo.subscribeToMore({
      document: event,
      variables: { group: `ISSUE_${uuid}`, types: ['NEW_MESSAGE'], timestamp: +new Date()},

      updateQuery: (previousResult, { subscriptionData }) => {
        const payload = JSON.parse(subscriptionData.data.event.payload);
        this.setState({ messages: [ ...this.state.messages, payload.message ] });

      },
      onError: (err) => console.error(err),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.apollo.loading) {
      this.setState({ messages: nextProps.apollo.messages });
    }
  }

  loadMoreMessages = () => {
    this.props.loadMoreEntries(this.state.messages[0].uuid)
      .then(fetchMoreResult => {
        this.setState({
          messages: [
            ...fetchMoreResult.data.messages,
            ...this.state.messages,
          ]
        })
      });
  }

  refetch = () => {
    this.props.apollo.refetch()
      .then((response) => this.setState({ messages: response.data.messages }))
  }

  render() {
    if (this.props.apollo.loading) {
      return null;
    }

    const { messages } = this.state;

    return (
      <Container>
        <h1>Issue: { this.props.apollo.issue.title }</h1>
        <ul>
          {messages.map(message => <li key={message.uuid}>{message.text}</li>)}
        </ul>
        <button onClick={this.loadMoreMessages}>Load more messages</button>


        <MessageForm
          onSubmit={
            (values) => {
              this.props.createMessage(values)
                .then(response => console.log({ response }))
            }
          }
        />
        <button onClick={ this.refetch }>Reload messages</button>
      </Container>
    );
  }
}

export default withMutation(withData(Issue));
