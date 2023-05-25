import { gql } from "@apollo/client"

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($searchTerm: String!, $after: String) {
    search(query: $searchTerm, type: REPOSITORY, first: 10, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
            url
            stargazerCount
            updatedAt
          }
        }
      }
    }
  }
`
