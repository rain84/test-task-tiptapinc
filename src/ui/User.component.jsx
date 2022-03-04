import { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useFetch, useStore } from '../hooks'
import { endpoint } from '../app.config'
import { Button, Table } from '../ui'
import style from './style.module.sass'

export const User = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const cb = (type) => (e) => {
    const { id } = e.target.closest('[data-id]')?.dataset
    if (!id) return

    navigate(`${location.pathname}/${type}/${id}`)
  }
  const onClick = {
    posts: useRef(cb('posts')).current,
    albums: useRef(cb('albums')).current,
  }

  const [store] = useStore()
  const { id } = useParams()

  const users = store?.users ? store.users : useFetch(endpoint.users())?.[0]
  const user = users?.find((user) => user.id == id)

  const posts = store?.posts
    ? store.posts.find((posts) => posts?.[0]?.userId == id)
    : useFetch(endpoint.posts(id), [id])?.[0]

  const albums = store?.albums
    ? store.albums.find((albums) => albums?.[0]?.userId == id)
    : useFetch(endpoint.albums(id), [id])?.[0]

  return (
    <div>
      <p className={style.text_right}>
        <Button.GoBack />
      </p>

      <br />

      {user && (
        <div>
          <p className={style.text_center}>
            USER {user.name} ({user.email})
          </p>
          <div className={style.posts_and_albums}>
            <Table
              caption="POSTS"
              rows={posts}
              columns={['id', 'title']}
              onClick={onClick.posts}
            />
            <Table
              caption="ALBUMS"
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
