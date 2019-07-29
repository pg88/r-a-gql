import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { Meteor } from 'meteor/meteor';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '/imports/ui/App'

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql')
})

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken();
  operation.setContext(() => ({
    headers: {
      'meteor-login-token': token
    }
  }));
  return forward(operation);
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([authLink ,httpLink ]),
  cache
})

const ApolloApp = () => (
  <ApolloProvider client={ client }>
    <App/>
  </ApolloProvider>
);

Meteor.startup(() => {
  render(
      <BrowserRouter>
        <ApolloApp />
      </BrowserRouter>,
      document.getElementById('react-target'));
});
