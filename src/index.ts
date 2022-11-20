import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import type { GraphQLSchema } from 'graphql'

const apolloServerVitePlugin = ({ apiPath = '/api', schema, csrfPrevention = true, cache = 'bounded', ...config }: { apiPath?: string, schema: GraphQLSchema } & Omit<ApolloServerExpressConfig, 'typeDefs' | 'schema' | 'resolvers'>) => {
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
        ...config,
        csrfPrevention,
        cache,
        schema,
        plugins: [
          ...config.plugins || [],
          ApolloServerPluginDrainHttpServer({ httpServer })
        ],
      })

      await apolloServer.start()
      apolloServer.applyMiddleware({ app, path: apiPath })
    }
  }
}

export default apolloServerVitePlugin
