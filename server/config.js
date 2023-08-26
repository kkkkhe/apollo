import mysql from 'mysql'
// import { UserSchema } from './users-schema';
export const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '2j8w6d12',
  database: 'test'
})