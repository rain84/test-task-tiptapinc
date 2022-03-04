import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFetch } from '../hooks'
import { endpoint, routing } from '../app.config'
import { utils } from '../utils'
import { Error } from '../ui'
import style from './style.module.sass'

const getUserStat = (stat, id) => stat?.filter(({ userId }) => userId === id)

export const Users = () => {
  const navigate = useNavigate()
  const onClick = useCallback((e) => {
    const { id } = e.target.closest('[data-id]')?.dataset
    if (!id) return

    const url = `${routing.user}/${id}`
    navigate(url)
  }, [])

  const [users_, usersError] = useFetch(endpoint.users())
  const users = useMemo(
    () =>
      users_?.map(({ id, name, username, email }) => ({
        id,
        name,
        username,
        email,
      })),
    [users_]
  )

  const [posts, postsError] = useFetch(endpoint.posts(), [endpoint.posts])
  const [todos, todosError] = useFetch(endpoint.todos(), [endpoint.posts])
  const [albums, albumsError] = useFetch(endpoint.albums(), [endpoint.posts])

  const error = utils.createErrorMessage({
    usersError,
    postsError,
    todosError,
    albumsError,
  })

  if (error) return <Error>{error}</Error>
  if (!users) return null

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <td colSpan="2" className={style.text_center}>
            USERS
          </td>
          <td>Posts</td>
          <td>Todos</td>
          <td>Albums</td>
        </tr>
      </thead>
      <tbody onClick={onClick}>
        {users.map((user) => (
          <tr key={user.id} data-id={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{getUserStat(posts, user.id)?.length}</td>
            <td>{getUserStat(todos, user.id)?.length}</td>
            <td>{getUserStat(albums, user.id)?.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
