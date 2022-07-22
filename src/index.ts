import { ViteDevServer } from 'vite'
import { ApolloServer } from 'apollo-server-express'

const apolloServerPlugin = ({ apolloServer, path = '/graphql' }: { apolloServer: ApolloServer, path?: string }) => ({
  name: 'apollo-server',
  config() {
    return {
      server: { proxy: { [path]: {} } },
      preview: { proxy: { [path]: {} } }
    }
  },
  async configureServer(server: ViteDevServer) {
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: server.middlewares as any, path })
  }
})

export default apolloServerPlugin
