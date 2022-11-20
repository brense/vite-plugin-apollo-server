import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import type { GraphQLSchema } from 'graphql'

type Options = Omit<ApolloServerOptions<BaseContext>, 'schema' | 'typeDefs' | 'resolvers'> & Required<Pick<ApolloServerOptions<BaseContext>, 'schema'>> & {
  apiPath?: string
  schema: GraphQLSchema
}

const apolloServerVitePlugin = ({ apiPath = '/api', schema, csrfPrevention = true, ...config }: Options) => {
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
        ...config as any,
        csrfPrevention,
        schema,
        plugins: [
          ...config.plugins || [],
          ApolloServerPluginDrainHttpServer({ httpServer })
        ],
      })
      await apolloServer.start()
      app.use(apiPath, expressMiddleware(apolloServer))
    }
  }
}

export default apolloServerVitePlugin
