import "./List.scss"
import { useNavigate } from "react-router-dom"

const List = ({ repositories }: { repositories: any[] }) => {
  const navigate = useNavigate()

  const handleClickRepository = (rep: any) => {
    // navigate(`/repositories/${rep.node.name}-${rep.node.owner.login}`)
    navigate(`/repositories/${rep.node.name}/${rep.node.owner.login}`)
  }

  return (
    <div className="list-main">
      <h2>Repositories</h2>
      <ul className="list">
        {repositories.slice(-10).map((rep: any) => (
          <li
            key={rep.node.url}
            className="list-card"
            onClick={() => handleClickRepository(rep)}
          >
            <p>Name: {rep.node.name}</p>
            <p>Stars: {rep.node.stargazerCount}</p>
            <p>Last commit: {rep.node.updatedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
