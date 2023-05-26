import React from "react"
import { RootState } from "../store/index"
import { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_REPOSITORIES } from "../api/api"
import Pagination from "../Pagination/Pagination"
import { repositoriesActions } from "../store/repositories"
import { useDispatch, useSelector } from "react-redux"
import { paginationActions } from "../store/pagination"
import List from "../List/List"

const RepositorySearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchRepositories] = useLazyQuery(SEARCH_REPOSITORIES)
  const [first, setFirst] = useState(10)
  const dispatch = useDispatch()
  const activePage = useSelector((state: RootState) => state.pagination.activePage)
  const [currentPage, setCurrentPage] = useState<number>(activePage)
  const loading = useSelector((state: RootState) => state.repositories.isLoading)
  const error = useSelector((state: RootState) => state.repositories.error)
  const repositories = useSelector((state: RootState) => state.repositories.repositories)

  const handleSearch = async () => {
    setCurrentPage(1)
    setFirst(10 * currentPage)
    handleRequest()
  }
  const handleClickSearch = async () => {
    setFirst(10 * currentPage)
    handleRequest()
  }
  const handleRequest = async () => {
    try {
      dispatch(repositoriesActions.setLoading(true))
      const { data } = await searchRepositories({
        variables: { searchTerm, first },
      })
      console.log(data?.search.pageInfo)
      dispatch(repositoriesActions.setRepositories(data?.search.edges))
      dispatch(paginationActions.updatePageInfo(data?.search.pageInfo))
    } catch (error) {
      dispatch(repositoriesActions.setError(true))
    } finally {
      dispatch(repositoriesActions.setLoading(false))
    }
  }

  useEffect(() => {
    if (!searchTerm) return
    handleClickSearch()
  }, [currentPage])

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleSearch()}>Search</button>

      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} />
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {repositories && !loading && <List repositories={repositories} />}
    </div>
  )
}

export default RepositorySearch
