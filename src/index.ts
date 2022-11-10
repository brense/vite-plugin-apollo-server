import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import type { GraphQLSchema } from 'graphql'

const apolloServerVitePlugin = ({ apiPath = '/api', schema }: { apiPath?: string, schema: GraphQLSchema }) => {
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
        csrfPrevention: true,
        cache: 'bounded',
        schema,
        plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer })
        ],
      })

      await apolloServer.start()
      apolloServer.applyMiddleware({ app, path: apiPath })
    }
  }
}

export default apolloServerVitePlugin
