import { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useFetch, useStore } from '../hooks'
import { endpoint } from '../api'
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

  const users = Array.isArray(store?.users)
    ? store.users
    : useFetch(endpoint.users())?.[0]
  const user = users?.find((user) => user.id == id)

  const posts = Array.isArray(store?.posts)
    ? store.posts.find((posts) => posts?.[0].userId == id)
    : useFetch(endpoint.posts(id), [id])?.[0]

  const albums = Array.isArray(store?.albums)
    ? store.albums.find((albums) => albums?.[0].userId == id)
    : useFetch(endpoint.albums(id), [id])?.[0]

  console.log('albums', albums)

  return (
    <div>
      <Button.GoBack />
      <br />

      {user && (
        <div>
          <p>USER {user.name}</p>
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
