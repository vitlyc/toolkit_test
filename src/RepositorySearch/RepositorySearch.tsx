import { RootState } from "../store/index"
import { useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_REPOSITORIES, SearchRepositoriesData, Repository } from "../api/api"
import Pagination from "../Pagination/Pagination"
import { repositoriesActions } from "../store/repositories"
import { useDispatch, useSelector } from "react-redux"
import { paginationActions } from "../store/pagination"
import List from "../List/List"
import UserCard from "../UserCard/UserCard"

const RepositorySearch = () => {
  const activePage = useSelector((state: RootState) => state.pagination.activePage)
  const searchText = useSelector((state: RootState) => state.pagination.searchText)
  const [searchRepositories] = useLazyQuery<SearchRepositoriesData>(SEARCH_REPOSITORIES)
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.repositories.isLoading)
  const error = useSelector((state: RootState) => state.repositories.error)
  const repositories = useSelector((state: RootState) => state.repositories.repositories)
  const itemsPerPage = 10

  const handleRequest = async () => {
    try {
      dispatch(repositoriesActions.setLoading(true))
      const { data } = await searchRepositories({
        variables: { searchText, first: itemsPerPage * activePage },
      })
      dispatch(
        repositoriesActions.setRepositories(data?.search.edges as unknown as Repository[])
      )
      dispatch(repositoriesActions.setError(false))
    } catch (error) {
      dispatch(repositoriesActions.setError(true))
    } finally {
      dispatch(repositoriesActions.setLoading(false))
    }
  }

  useEffect(() => {
    if (!searchText) return
    handleRequest()
  }, [activePage])

  useEffect(() => {
    handleRequest()
  }, [searchText])

  useEffect(() => {
    dispatch(repositoriesActions.setLoading(false))
  }, [])

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          dispatch(paginationActions.updateSearchText(e.target.value as string))
          dispatch(paginationActions.updateActivePage(1))
        }}
      />

      <Pagination />
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {repositories && !loading && searchText.length != 0 && (
        <List repositories={repositories} />
      )}
      {!loading && searchText.length === 0 && !error && <UserCard />}
    </div>
  )
}

export default RepositorySearch
