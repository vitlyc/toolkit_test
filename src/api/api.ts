import { gql } from "@apollo/client"

export interface SearchRepositoriesData {
  search: {
    repositoryCount: number
    pageInfo: PageInfo
    edges: SearchResultItemEdge[]
  }
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  __typename: string
}

export interface SearchResultItemEdge {
  node: Repository
  __typename: string
}

export interface Repository {
  owner: {
    login: string
    __typename: string
  }
  name: string
  url: string
  stargazerCount: number
  updatedAt: string
  __typename: string
}

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($searchText: String!, $first: Int, $after: String) {
    search(query: $searchText, type: REPOSITORY, first: $first, after: $after) {
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
      url
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
export const SEARCH_USER = gql`
  query {
    viewer {
      login
      name
      email
      avatarUrl
      repositories(first: 5) {
        nodes {
          name
          description
        }
      }
    }
  }
`
