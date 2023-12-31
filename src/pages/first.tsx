import { TypedDocumentNode, gql, useBackgroundQuery, useQuery, useSuspenseQuery, QueryReference, useReadQuery } from "@apollo/client";
import { Suspense, startTransition, useState } from "react";
// import { Link } from "react-router-dom";



export const First = () => {
  const [ id, setId ] = useState(1)
  // const [ref] = useBackgroundQuery(EPISODES, { variables: { characterId: id } });
  // const { data} = useSuspenseQuery(CHARACTERS, { variables: { characterId: id } });
  // console.log(data)
  // if(loading) {
  //   return <div>loading...</div>
  // }
  console.log(id)
  
  return (
    <div>
      <h1 style={{ fontSize: 24}}>first page</h1>
      {/* {data && data.character && data.character.name || ''} */}
      {/* <Link style={{ color: 'green'}} to={'/second'}>go to second page</Link> */}
      <button onClick={() => startTransition(() => setId((prev) => prev + 1))}>update data</button>
      {/* <Suspense fallback={<div>loading1...</div>}>
      <Test id={id} qRef={ref}/>
      </Suspense>
      <Suspense fallback={<div>loading2...</div>}>
      <Test id={id} qRef={ref}/>
      </Suspense> */}
    </div>
  )
}

const Test = ({ id, qRef }: { id: number, qRef: QueryReference}) => {
  return (
    <div>
      {/* <Test1 qRef={qRef}/> */}
    </div>
  )
}
const Test2 = ({ id, qRef }: { id: number, qRef: QueryReference}) => {
  return (
    <div>
      {/* <Test1 qRef={qRef}/> */}
    </div>
  )
}

const Test1 = ({ qRef }: { qRef: QueryReference}) => {
  const { data }: { data: any} = useReadQuery(qRef);
  if(!data){
    return null
  }
  console.log(data)
  return (
    <div>
      {data?.characters.results.map(({ created }, id: number) => {
        return (
          <div key={id}>{created}</div>
        )
      })}
    </div>
  )
}