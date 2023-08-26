import { GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    user: {
      id: GraphQLInt,
      name: GraphQLString,
      surname: GraphQLString
    }
  }
})
// const Users = {
//   type: 
// }

export const UserSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Address",
    fields: {
      street: { type: GraphQLString },
      number: { type: GraphQLInt },
      formatted: {
        type: GraphQLString,
        resolve(obj) {
          return obj.number + " " + obj.street
        },
      },
    },
  })
})