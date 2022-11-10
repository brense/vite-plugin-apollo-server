# vite-plugin-apollo-server

Apply apollo server middleware to the vite dev server

## Installation

`npm i vite-plugin-apollo-server`

## Usage

```ts
import { defineConfig } from 'vite'
import apolloServerPlugin from 'vite-plugin-apollo-server'

const schema = // generate your GraphQLSchema

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [apolloServerPlugin({ schema })]
})

```
