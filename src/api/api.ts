import { gql } from "@apollo/client"

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($searchTerm: String!, $first: Int, $after: String) {
    search(query: $searchTerm, type: REPOSITORY, first: $first, after: $after) {
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
            owner {
              login
            }
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

export const SEARCH_REPOSITORY = gql`
  query GetRepositoryDetails($repositoryName: String!, $owner: String!) {
    repository(name: $repositoryName, owner: $owner) {
      name
      stargazerCount
      updatedAt
      owner {
        login
        avatarUrl
      }
      languages(first: 1) {
        nodes {
          name
        }
      }
      description
    }
  }
`
