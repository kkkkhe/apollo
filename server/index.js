import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import cors from 'cors'
import mysql from 'mysql'
// import { UserSchema } from './users-schema';
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '2j8w6d12',
  database: 'test'
})

const Type = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
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
        //  return { 
        //   id: 1,
        //   name: "denis",
        //   surname: "surname"
        //  }
        },
      },
    },
  }),
});
// var schema = buildSchema(`
//   type User {
//     id: String
//     name: String
//     surname: String
//   }

//   type Query {
//     user(id: Int): User
//   }

//   type Mutation {
//     createUser(name: String, surname: String): User
//   }
//   `)
//   connection.connect()
var root = {
  user: ({ id }) => {
      // connection.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
      // if(err){
      //   console.log(err)
      // }
      console.log()
      return {
        id,
        name: 'name',
        surname: "surname"
      }
    },
  // createUser: ({ name, surname }) => {
  //   return new Promise(resolve => {connection.query(`INSERT INTO user (name, surname) VALUES (?, ?)`, [name, surname], (err, res) => {
  //     if(err){
  //       console.log(err)
  //     }
  //     connection.query('SELECT * FROM user WHERE id = LAST_INSERT_ID()', (err, res) => {
  //       const { id, name, surname } = res[0]
  //       resolve({
  //         id,
  //         name,
  //         surname
  //       })
  //     })
  //   })
  // })
  // }
}

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.all('/graphql', createHandler({ schema }));
// app.use(
//   "/graphql",
//   createHandler({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   })
// )
app.listen(3000, () => {
  console.log('success')
})