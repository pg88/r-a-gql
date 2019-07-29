import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    hi: String,
    resolutions: [ Resolution ],
    resolutionLookUp(_id: String!): Resolution
  }
  `;

module.exports = typeDefs;

