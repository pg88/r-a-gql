import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { Meteor } from 'meteor/meteor';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { BrowserRouter } from 'react-router-dom'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '/imports/ui/App'

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql')
})

//AUTH LINK
const authLink = setContext((_, { headers }) => {
  const token = Accounts._storedLoginToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})

const ApolloApp = () => (
  <ApolloProvider client={ client }>
    <App/>
  </ApolloProvider>
);

//APOLLO PROVIDER AND WRAP THE APP
Meteor.startup(() => {
  render(
      <BrowserRouter>
        <ApolloApp />
      </BrowserRouter>,
      document.getElementById('react-target'));
});
