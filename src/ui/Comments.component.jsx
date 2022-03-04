import { useParams } from 'react-router-dom'

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

  return (
    <div>
      <br />

      <p className={style.text_center}>
        Comments ({comments?.length ?? '0'}) &nbsp;
        <Button.GoBack />
      </p>

      <br />

      <br />
      {comments && <Table rows={comments} columns={['id', 'name']} />}
    </div>
  )
}
