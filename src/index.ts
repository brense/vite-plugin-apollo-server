import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import type { GraphQLSchema } from 'graphql'

type Options = {
  csrfPrevention?: boolean
  apiPath?: string
  schema: GraphQLSchema
}

const apolloServerVitePlugin = ({ apiPath = '/api', schema, csrfPrevention = true }: Options) => {
  return {
    name: 'vite-plugin-apollo-server',
    config() {
      return {
        server: {
          proxy: {
            [apiPath]: {}
          }
        },
        preview: {
          proxy: {
            [apiPath]: {}
          }
        }
      }
    },
    async configureServer({ httpServer, middlewares: app }: any) {
      const apolloServer = new ApolloServer({
        csrfPrevention,
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      })
      await apolloServer.start()
      app.use(apiPath, expressMiddleware(apolloServer))
    }
  }
}

export default apolloServerVitePlugin
