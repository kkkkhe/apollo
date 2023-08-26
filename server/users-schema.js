import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { connection } from './config.js'
const Type = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
  }
})

export const getUserSchema = {
  type: Type,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: (_, params) => {
    return new Promise(resolve => {
      connection.query('SELECT * FROM user WHERE id = ?', [params.id], (err, res) => {
        if(err){
          console.log(err)
        }
        const { id, name, surname } = res[0]
        resolve({
          id,
          name,
          surname
        })
    })
  })
  },
}
const UsersType = new GraphQLList(new GraphQLObjectType({
  name: "Users",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
  }
}))
export const getUsersSchema = {
  type: UsersType,
  resolve() {
    return new Promise(resolve => {
      connection.query('SELECT * FROM user', (err, res) => {
        if(err){
          console.log(err)
        }
        resolve(res)
      })
    })
  }
}

export const createUserSchema = {
  type: Type,
  args: {
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
  },
  resolve: (_, params) => {
    return new Promise(resolve => {connection.query(`INSERT INTO user (name, surname) VALUES (?, ?)`, [params.name, params.surname], (err) => {
      if(err){
        console.log(err)
      }
      connection.query('SELECT * FROM user WHERE id = LAST_INSERT_ID()', (err, res) => {
        const { id, name, surname } = res[0]
        resolve({
          id,
          name,
          surname
        })
      })
    })
  })
  }
}