import { Mongo } from 'meteor/mongo'

const Votes = new Mongo.Collection("votes");

export default Votes;
