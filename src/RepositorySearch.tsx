import { useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_REPOSITORIES } from "./api/api"
import Pagination from "./Pagination/Pagination"
import { repositoriesActions } from "./store/repositories"
import { useDispatch, useSelector } from "react-redux"
import { paginationActions } from "./store/pagination"

const RepositorySearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchRepositories, { loading, error, data }] = useLazyQuery(SEARCH_REPOSITORIES)
  const [after, setAfter] = useState("Y3Vyc29yOjMw")
  const dispatch = useDispatch()

  const handleSearch = async () => {
    const { data } = await searchRepositories({
      variables: { searchTerm, first: 10, after: after },
    })
    dispatch(repositoriesActions.updateRepositories(data?.search.edges))
    console.log(data?.search.pageInfo)
    dispatch(paginationActions.updatePageInfo(data?.search.pageInfo))
  }

  // start: 90 надо добавить к запросу параметр

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <Pagination />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.search.edges.map((edge: any) => (
            <li key={edge.node.url}>
              <a href={edge.node.url}>{edge.node.name}</a>
              <p>Stars: {edge.node.stargazerCount}</p>
              <p>Last commit: {edge.node.updatedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RepositorySearch
