import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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
const GET_USERS = gql`
  query Users {
    users {
      id,
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
  const { data: users, loading: areUsersLoading } = useQuery(GET_USERS);
  const [ createUser ] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USERS]
  });
  // console.log(users)
  if(loading) {
    return <div>loading...</div>
  }
  if(areUsersLoading){
    return <div>loading2...</div>
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
      {users.users.map(({id,name,surname})=> {
        console.log
        return (
          <div key={id}>
            {name} {surname}
          </div>
        )
      })}
    </div>
  )
}

