import { GraphQLSchema } from 'graphql'
import queryType from './query'

export default new GraphQLSchema({query: queryType})
