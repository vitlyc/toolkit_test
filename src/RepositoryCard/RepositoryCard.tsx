import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_REPOSITORY } from "../api/api"
import BackButton from "../BackButton/BackButton"

interface RepositoryData {
  repository: {
    __typename: string
    name: string
    stargazerCount: number
    updatedAt: string
    url: string
    owner: {
      __typename: string
      login: string
      avatarUrl: string
    }
    languages: {
      __typename: string
      nodes: {
        __typename: string
        name: string
      }[]
    }
    description: string
  }
}
interface RouteParams {
  [key: string]: string | undefined
}

const RepositoryCard = () => {
  const [searchRepositories] = useLazyQuery(SEARCH_REPOSITORY)
  const params = useParams<RouteParams>()
  const { name, login } = params
  const [data, setData] = useState<RepositoryData | null>(null)

  const handleRequest = async () => {
    const { data } = await searchRepositories({
      variables: { repositoryName: name, owner: login },
    })
    setData(data)
  }

  useEffect(() => {
    handleRequest()
  }, [])

  return (
    <section>
      <h1>Repository Detail</h1>
      {data && (
        <>
          <img src={data.repository.owner.avatarUrl} alt="Owner Avatar" />
          <p>Name: {data.repository.name}</p>
          <p>Description: {data.repository.description}</p>
          <p>Owner Login: {data.repository.owner.login}</p>
          <p>Owner Avatar:</p>
          <p>
            Languages:{" "}
            {data.repository.languages.nodes.map((node) => node.name).join(", ")}
          </p>
          <p>Stargazer Count: {data.repository.stargazerCount}</p>
          <a href={data.repository.url}>URL</a>
        </>
      )}
      <BackButton />
    </section>
  )
}

export default RepositoryCard
