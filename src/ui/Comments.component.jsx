import { useParams } from 'react-router-dom'

import { useSimpleQuery } from '../hooks'
import { Button, Table } from '../ui'
import { utils } from '../utils'
import style from './style.module.sass'

export const Comments = () => {
  const { postId } = useParams()
  const [comments, commentsError] = useSimpleQuery('comments', { postId })

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
