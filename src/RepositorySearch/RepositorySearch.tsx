import React from "react"
import { RootState } from "../store/index"
import { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_REPOSITORIES, SearchRepositoriesData, Repository } from "../api/api"
import { PageInfo } from "../store/pagination"
import Pagination from "../Pagination/Pagination"
import { repositoriesActions } from "../store/repositories"
import { useDispatch, useSelector } from "react-redux"
import { paginationActions } from "../store/pagination"
import List from "../List/List"

const RepositorySearch = () => {
  const activePage = useSelector((state: RootState) => state.pagination.activePage)
  const searchText = useSelector((state: RootState) => state.pagination.searchText)
  const [searchTerm, setSearchTerm] = useState(searchText)
  const [searchRepositories] = useLazyQuery<SearchRepositoriesData>(SEARCH_REPOSITORIES)
  const [first, setFirst] = useState(10)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(activePage)
  const loading = useSelector((state: RootState) => state.repositories.isLoading)
  const error = useSelector((state: RootState) => state.repositories.error)
  const repositories = useSelector((state: RootState) => state.repositories.repositories)
  const itemsPerPage = 10

  const handleSearch = async () => {
    console.log("search")

    setCurrentPage(1)
    setFirst(itemsPerPage * currentPage)
    dispatch(paginationActions.updateSearchText(searchTerm as string))
    handleRequest()
  }
  const handleClickSearch = async () => {
    setFirst(itemsPerPage * currentPage)
    handleRequest()
  }
  const handleRequest = async () => {
    try {
      dispatch(repositoriesActions.setLoading(true))
      const { data } = await searchRepositories({
        variables: { searchTerm, first },
      })
      dispatch(
        repositoriesActions.setRepositories(data?.search.edges as unknown as Repository[])
      )
      dispatch(paginationActions.updatePageInfo(data?.search.pageInfo as PageInfo))
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

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
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
