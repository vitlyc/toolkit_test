import { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_USER } from "../api/api"

type User = {
  login: string
  name: string
  email: string
  avatarUrl: string
  repositories: {
    nodes: {
      name: string
      description: string
      stargazerCount: number
    }[]
  }
}

const UserCard = () => {
  const [searchRepositories, { data }] = useLazyQuery<{ viewer: User }>(SEARCH_USER)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    searchRepositories()
  }, [searchRepositories])

  useEffect(() => {
    if (data?.viewer) {
      setUser(data.viewer)
    }
  }, [data])

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Login: {user.login}</p>
      <p>Email: {user.email}</p>
      <img src={user.avatarUrl} alt="Avatar" />

      <h3>Repositories</h3>
      <ul>
        {user.repositories.nodes.map((repo) => (
          <li key={repo.name}>
            <p>Name: {repo.name}</p>
            <p>Description: {repo.description}</p>
            <p>Stars: {repo.stargazerCount}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserCard
