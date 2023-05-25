// import React, { useEffect, useState } from "react"
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

// interface Repository {
//   name: string
//   stargazerCount: string
//   updatedAt: string
//   url: string
// }
// const UserRepositoryList = () => {
//   const [repositories, setRepositories] = useState<Repository[]>([])
//   const searchQuery = "vitlyc"
//   const ACCESS_TOKEN = "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"

//   const client = new ApolloClient({
//     uri: "https://api.github.com/graphql",
//     cache: new InMemoryCache(),
//     headers: {
//       Authorization: `Bearer ${ACCESS_TOKEN}`,
//     },
//   })

//   useEffect(() => {
//     const fetchRepositories = async () => {
//       const response = await client.query({
//         query: gql`
//           query SearchRepositories($searchQuery: String!) {
//             search(query: $searchQuery, type: REPOSITORY, first: 10) {
//               repositoryCount
//               edges {
//                 node {
//                   ... on Repository {
//                     name
//                     url
//                   }
//                 }
//               }
//             }
//           }
//         `,
//         variables: { searchQuery },
//       })

//       setRepositories(response.data.user.repositories.nodes)
//     }

//     fetchRepositories()
//   }, [searchQuery])

//   if (repositories.length == 0) {
//     return <div>Loading...</div>
//   }
//   console.log(repositories)

//   return (
//     <div>
//       <h2>Repositories</h2>
//       <ul>
//         {repositories.map((repository) => (
//           <li key={String(new Date(repository.updatedAt).getTime())}>
//             <a href={repository.url}>{repository.name}</a>
//             <p>Stars: {repository.stargazerCount}</p>
//             <p>Last commit: {repository.updatedAt}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default UserRepositoryList

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import RepositorySearch from "./RepositorySearch"
const ACCESS_TOKEN = "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"

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <RepositorySearch />
  </ApolloProvider>
)

export default App
