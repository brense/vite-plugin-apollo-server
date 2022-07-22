# vite-plugin-apollo-server

Apply apollo server middleware to the vite dev server

## Installation

`npm i vite-plugin-apollo-server`

## Usage

```ts
import { defineConfig } from 'vite'
import { ApolloServer } from 'apollo-server-express'
import apolloServerPlugin from 'vite-plugin-apollo-server'

const apolloServer = new ApolloServer({
  schema,
  context,
  csrfPrevention: true,
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    apolloServerPlugin({
      apolloServer,
      path: '/api'
    })
  ]
})

```
