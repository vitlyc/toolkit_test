import "./Pagination.scss"
import { paginationActions } from "../store/pagination"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/index"

const Pagination = () => {
  const totalPages = 10
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const activePage = useSelector((state: RootState) => state.pagination.activePage)
  const dispatch = useDispatch()

  const handlePageClick = (page: number) => {
    dispatch(paginationActions.updateActivePage(page))
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => handlePageClick(page)}
            className={activePage === page ? "active page-item" : "page-item"}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Pagination
