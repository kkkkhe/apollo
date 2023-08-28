import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ChildComponent } from "./ui/child";
// const GET_CHARACTERS = gql`
//   query Album($characterId: ID!) {
//     character(id: $characterId) {
//       created,
//     }
//   }
// `;
const USER_FIELDS = gql`
  fragment UserFields on User {
    ...UserName
  }
  ${ChildComponent.fragments.userName}
`
const GET_USER = gql`
  ${USER_FIELDS}
  query MyQuery  ($id: Int!) {
    user(id: $id) {
      id,
      surname,
      ...UserFields,
      pet {
        id,
        name
      }
    }
 }
`

const GET_USERS = gql`
  query Users($if: Boolean!) {
    users {
      id,
      name,
      
      surname @skip(if: $if),
    }
  }
`

const CREATE_USER = gql`
  mutation MyMutation($name: String!, $surname: String!, $age: Int) {
    createUser (name: $name, surname: $surname, age: $age) {
      id,
      name,
      surname,
    }
  }
`;

export const SecondPage = () => {
  const [name, changeName] = useState('')
  const [userId, setUserId] = useState(1)
  const [surname, changeSurname] = useState('')
  const fetchAnotherUser = () => {
    setUserId(prev => prev + 1)
  }
  const { data, loading } = useQuery(GET_USER, { variables: { id: userId }});
  console.log(data)

  // const { data: users, loading: areUsersLoading } = useQuery(GET_USERS, {
  //   variables: { if: true, id: 2 }
  // });
  const [ createUser, { data: createdUser } ] = useMutation(CREATE_USER, {
    variables: { name, surname },
    //!=========
    // refetchQueries: ['Users'], // refetch this query when mutation is done
    //!=========
    update: (cache, { data: { createUser }}) => {
      cache.modify({
        fields: {
          users: (oldData = []) => {
            const newUserRef = cache.writeFragment({
              data: createUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                }
              `
            });
            console.log(newUserRef)
            return [...oldData, newUserRef]
          }
        }
      })
    } // when modification is done, notify the localstate
    //!==========
  });
  // console.log(createdUser)
  // console.log(users)
  // if(areUsersLoading){
  //   return <div>loading2...</div>
  // }
  // console.log(data)
  if(loading){
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
      <button onClick={() => fetchAnotherUser()}>fetch another user</button>
      {data.user.name}
      {/* <Link style={{ color: 'green'}} to={'/'}>go to second page</Link> */}
      {/* {users.users.map(({id,name,surname}: {id: number, name: string, surname: string})=> {
        console.log
        return (
          <div key={id}>
            {name} {surname}
          </div>
        )
      })} */}
      {/* <ChildComponent userName={data.userName}/> */}
    </div>
  )
}