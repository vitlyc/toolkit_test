import { useNavigate } from "react-router-dom"
import "./BackButton.scss"

const BackButton = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="button">
      <button className="back-button" onClick={handleGoBack}>
        BACK
      </button>
    </div>
  )
}

export default BackButton
