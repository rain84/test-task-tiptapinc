import { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useFetch } from '../hooks'
import { endpoint } from '../app.config'
import { utils } from '../utils'
import { Button, Table } from '../ui'
import style from './style.module.sass'

export const User = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { userId } = useParams()

  const cb = (type, subtype) => (e) => {
    const { id } = e.target.closest('[data-id]')?.dataset
    if (!id) return

    const url = `${location.pathname}/${type}/${id}/${subtype}`
    navigate(url)
  }
  const onClick = {
    posts: useRef(cb('posts', 'comments')).current,
    albums: useRef(cb('albums', 'photos')).current,
  }

  const [user, userError] = useFetch(endpoint.users({ userId }))
  const [posts, postsError] = useFetch(endpoint.posts({ userId }), [userId])
  const [albums, albumsError] = useFetch(endpoint.albums({ userId }), [userId])

  const error = utils.createErrorMessage({
    userError,
    postsError,
    albumsError,
  })

  if (error) return <Error>{error}</Error>

  return (
    <div>
      <p className={style.text_center}>
        USER <span className={style.color_red}>{user?.username}</span>&nbsp;(
        {user?.email}) &nbsp;
        <Button.GoBack />
      </p>

      <br />

      {user && (
        <div>
          <div className={style.posts_and_albums}>
            <Table
              caption={`POSTS (${posts?.length ?? '0'})`}
              rows={posts}
              columns={['id', 'title']}
              onClick={onClick.posts}
            />
            <Table
              caption={`ALBUMS (${albums?.length ?? '0'})`}
              rows={albums}
              columns={['id', 'title']}
              onClick={onClick.albums}
            />
          </div>
        </div>
      )}
    </div>
  )
}
