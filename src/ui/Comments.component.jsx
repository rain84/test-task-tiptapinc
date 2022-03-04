import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useFetch } from '../hooks'
import { endpoint } from '../app.config'
import { Button, Table } from '../ui'
import { utils } from '../utils'
import style from './style.module.sass'

export const Comments = () => {
  const { postId } = useParams()
  const [comments, commentsError] = useFetch(endpoint.comments({ postId }), [
    postId,
  ])

  const error = utils.createErrorMessage({
    commentsError,
  })

  if (error) return <Error>{error}</Error>
  console.log('comments', comments)

  return (
    <div>
      <p className={style.text_right}>
        <Button.GoBack />
      </p>

      <br />

      {comments && (
        <Table
          caption={`Comments (${comments.length ?? '0'})`}
          rows={comments}
          columns={['id', 'name']}
        />
      )}
    </div>
  )
}
