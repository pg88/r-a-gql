import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    hi: String
  }
`;

module.exports = typeDefs;