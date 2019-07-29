import { Meteor } from 'meteor/meteor';
import ApolloServers from "../imports/server/gql";


Meteor.startup(() => {
  ApolloServers
});
