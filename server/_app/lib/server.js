import express from 'express'
import {createLogger, stdSerializers} from 'bunyan'
import graphqlHTTP from 'express-graphql'
import schema from '../graphql/goldberg/schema'

const log = createLogger({
  name: 'Le Server',
  serializers: {
    err: stdSerializers.err
  }
})

const PORT = process.env.NODE_PORT || 3000

const graphQLServer = express()

graphQLServer.use('/', graphqlHTTP({ schema, graphiql: true }))

export default cb => {
  graphQLServer.listen(PORT, () => {
    log.trace('It\'s alive!x!')

    if (cb) {
      cb()
    }
  })
}
