import { ApolloServer, gql } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'

import hi from './schema'
import resolvers from './resolvers'
import ResolutionsSchema from "../../api/resolutions/Resolution.graphql"

//UPDATE 1
const typeDefs = [ hi, ResolutionsSchema ];

const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true,
      context: async ({ req }) => ({
        user:{}
      })
})


server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})