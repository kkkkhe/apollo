import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";

// const GET_CHARACTERS = gql`
//   query Album($characterId: ID!) {
//     character(id: $characterId) {
//       created,
//     }
//   }
// `;

const GET_USER = gql`
  query MyQuerys($id: Int!) {
    user(id: $id) {
      id
      name,
      surname
    }
 }
`
const CREATE_USER = gql`
  mutation MyMutation($name: String!, $surname: String!) {
    createUser(name: $name, surname: $surname) {
      id,
      name,
      surname
    }
  }
`
export const SecondPage = () => {
  const [name, changeName] = useState('')
  const [surname, changeSurname] = useState('')
  // const { data, loading } = useQuery(GET_USER, ({variables: {id: 1}}));
  const { data, loading } = useQuery(GET_USER, { variables: { id: 1 }});
  const [ createUser ] = useMutation(CREATE_USER);
  console.log(data)
  if(loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      second
      <form action="">
        <input type="text" value={name} onChange={e => changeName(e.target.value)}/>
        <input type="text" value={surname} onChange={e => changeSurname(e.target.value)}/>
        <button onClick={(e) => {
          e.preventDefault()
          createUser({ variables: { name, surname }})
        }}>create user</button>
      </form>
      {/* <Link style={{ color: 'green'}} to={'/'}>go to second page</Link> */}
    </div>
  )
}

