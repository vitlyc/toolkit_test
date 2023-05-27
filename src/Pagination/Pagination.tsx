import "./Pagination.scss"
import { paginationActions } from "../store/pagination"
import { useDispatch } from "react-redux"

type PaginationProps = {
  setCurrentPage: (page: number) => void
  currentPage: number | undefined
}

const Pagination = ({ setCurrentPage, currentPage }: PaginationProps) => {
  const totalPages = 10
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  // const activePage = useSelector((state: RootState) => state.pagination.activePage)
  const dispatch = useDispatch()

  const handlePageClick = (page: number) => {
    dispatch(paginationActions.updateActivePage(page))
    setCurrentPage(page)
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => handlePageClick(page)}
            className={currentPage === page ? "active page-item" : "page-item"}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Pagination
