import ApolloClient, { addTypename, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const createApolloClient = (options) => new ApolloClient({
  queryTransformer: addTypename,
  dataIdFromObject: (result) => result.__typename + result.uuid,
  ...options
});


const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8888/graphql',
  opts: {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options) {
      req.options = {};
    }
    req.options.headers = {};

    req.options.headers['chat-auth-token']
      = localStorage.getItem('chat-auth-token');

    next();
  },
}]);


const wsClient = new SubscriptionClient(`ws://localhost:9000/`, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  },
  subscribe: (request, handler) => wsClient.subscribe(request, handler),
  unsubscribe: (id) => wsClient.unsubscribe(id),
  onConnect: () => console.log('onConnect'),
  onReconnect: () => console.log('onReconnect'),
  onDisconnect: () => console.log('onDisconnect'),
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

const client = createApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: {},
});



export default client;
