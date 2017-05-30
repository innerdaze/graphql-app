import { GraphQLObjectType, GraphQLInt } from 'graphql'
import goldbergs from '../data/goldbergs'
import goldbergType from './model'

export default new GraphQLObjectType({
  name: 'query',
  description: 'Goldberg query',
  fields: {
    goldberg: {
      type: goldbergType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (_, args) => (
        getGoldberg(args.id)
      )
    }
  }
})

export function getGoldberg(id) {
  return goldbergs[id]
}
