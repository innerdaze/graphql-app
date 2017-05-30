import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

export default new GraphQLObjectType({
  name: 'Goldberg',
  description: 'Member of The Goldbergs',
  fields: {
    character: {
      type: GraphQLString,
      description: 'Name of the character'
    },
    actor: {
      type: GraphQLString,
      description: 'Actor playing the character'
    },
    role: {
      type: GraphQLString,
      description: 'Family role'
    },
    traits: {
      type: GraphQLString,
      description: 'Traits this Goldberg is known for'
    },
    id: {
      type: GraphQLInt,
      description: 'ID of this Goldberg'
    }
  }
})
