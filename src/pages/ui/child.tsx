import { gql } from "@apollo/client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChildComponent = ({userName}:any) => {
  console.log(userName)
  return (
    <div>
      child component
    </div>
  )
}
ChildComponent.fragments = {
  userName: gql`
    fragment UserName on User {
      name,
    }
  `
}