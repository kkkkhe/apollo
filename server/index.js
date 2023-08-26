import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import { 
  GraphQLSchema, 
  GraphQLObjectType, 
} from 'graphql'
import cors from 'cors'
import { getUserSchema, createUserSchema, getUsersSchema } from './users-schema.js';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: getUserSchema,
      users: getUsersSchema
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: createUserSchema,
    },   
  })
});

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.all('/graphql', createHandler({ schema }));

app.listen(3000, () => {
  console.log('success')
})