import { Meteor } from 'meteor/meteor';
import ApolloServers from '../imports/server/gql';
import Resolutions from '../imports/api/resolutions/resolutions'
import DataSeed from '../imports/server/dataSeed/Submissions';

Meteor.startup(() => {
  if(Resolutions.find().count() ===0 ) {
    DataSeed.forEach((item) => { Resolutions.insert(item) })
  }
  //ApolloServers,
});
