import { useNavigate } from 'react-router-dom'

export const GoBack = () => {
  const navigate = useNavigate()
  const onClickBack = () => navigate(-1)

  return <button onClick={onClickBack}>Back</button>
}
