import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { connection } from './config.js'
const Type = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    pet: {
      type: new GraphQLObjectType({
        name: 'Pet',
        fields: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString }
        }
      })
    }
    // pet_name: { type: GraphQLString}
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
        connection.query('SELECT * FROM pet WHERE id = ?', [res[0].pet_id], (err, response) => {
          if(err){
            console.log(err)
          }
          if(res[0]){
            const { id, name, surname } = res[0]
            console.log({
              id,
              name,
              surname,
              pet: {
                name: response[0].name,
                id: response[0].id
              }
            })

            resolve({
              id,
              name,
              surname,
              pet: {
                name: response[0].name,
                id: response[0].id
              }
            })
          }
          resolve();
        })
    })
  })
  },
}
const UsersType = new GraphQLObjectType({
  name: "Users",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
  }
})
export const getUsersSchema = {
  type: new GraphQLList(UsersType),
  resolve() {
    return new Promise(resolve => {
      connection.query('SELECT * FROM user', (err, res) => {
        if(err){
          console.log(err)
        }
        console.log(res)
        // if(res){
        //   resolve(res)
        // }
        resolve([])
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
          surname,
        })
      })
    })
  })
  }
}