import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom'

import App from '/imports/ui/App'

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql')
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
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
