import { gql } from "@apollo/client"
import { FragmentType, graphql, useFragment } from "../../gql"
const ProfileFragment = graphql(`
  fragment Pet on Pet {
    id,
    name
  }
`)
// FragmentType<typeof ProfileFragment>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChildComponent = ({ pet }: { pet: FragmentType<typeof ProfileFragment>}) => {
  const { id, name } = useFragment(ProfileFragment, pet)
  return (
    <div>
      {id} {name}
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