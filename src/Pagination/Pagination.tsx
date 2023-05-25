import "./Pagination.scss"
import { paginationActions } from "../store/pagination"
import { useDispatch, useSelector } from "react-redux"

const Pagination = (params: any) => {
  const totalPages = 10
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const activePage = useSelector((state: any) => state.pagination.activePage)
  const repositories = useSelector((state: any) => state.repositories.repositories)
  const dispatch = useDispatch()

  const handlePageClick = (page: number) => {
    dispatch(paginationActions.updateActivePage(page))
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} onClick={() => handlePageClick(page)} className="page-item">
            <a href="!#" className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Pagination
